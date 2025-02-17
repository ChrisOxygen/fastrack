"use client";

import HeaderScroll from "@/components/HeaderScroll";
import IvTrading from "@/components/IvTrading";

import TradingViewWidget from "@/components/TradingViewWidget";
import {
  getInvestment,
  updateSingleInvestmentBasedOnDuration,
} from "@/utils/actions/investment.actions";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { redirect, useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import InBoxLoader from "@/components/InBoxLoader";
import { INVESTMENT_PLANS } from "@/constants";
import IvSimulator from "@/components/IvSimulator";
import ActiveInvestmentCompleted from "@/components/ActiveInvestmentCompleted";

export type Investment = {
  amount: number;
  createdAt: string;
  investmentPackage: "emerald" | "sappphire" | "diamond";
  returns: number;
  status: "running" | "processing" | "completed";
  updatedAt: string;
  user: string;

  _id: string;
};

function InvestmentPage() {
  const [runningStatus, setRunningStatus] = useState<
    "pending" | "running" | "ended"
  >("pending");
  const { id } = useParams();
  const router = useRouter();
  const { data: session, status } = useSession();
  const queryClient = useQueryClient();
  const { data, status: queryStatus } = useQuery({
    queryKey: ["investment"],
    queryFn: () => {
      return getInvestment(id as string);
    },
    enabled: !!session?.user.id,
  });

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateSingleInvestmentBasedOnDuration(id as string),
    onError: (error) => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["investment", "investments"],
      });
      router.push(`/dashboard/investment/processing/${id}`);
    },
  });

  const investment = data as Investment;

  useEffect(() => {
    if (investment?.investmentPackage) {
      setRunningStatus("running");
    }
  }, [investment]);

  useEffect(() => {
    const packageDurationDays = INVESTMENT_PLANS.find(
      (plan) =>
        plan.packageName.toLowerCase() ===
        investment?.investmentPackage.toLowerCase(),
    )?.durationDays;
    const interval = setInterval(() => {
      const currentTime = new Date();
      const durationSecs = packageDurationDays! * 24 * 60 * 60;
      const createdTime = new Date(investment?.createdAt);
      const endTime = new Date(
        createdTime.setSeconds(createdTime.getSeconds() + durationSecs),
      );

      const remainingDurationSecs =
        (endTime.getTime() - currentTime.getTime()) / 1000;

      if (remainingDurationSecs <= 0) {
        setRunningStatus("ended");
        mutate();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [investment?.investmentPackage, investment?.createdAt, mutate]);

  if (
    runningStatus === "pending" ||
    status === "loading" ||
    queryStatus === "pending" ||
    runningStatus === "ended"
  )
    return <InBoxLoader />;
  if (status === "unauthenticated") {
    redirect("/login");
  }

  const {
    investmentPackage,
    amount,
    createdAt,
    status: ivStatus,
    returns,
  } = investment;

  console.log("investment", investment);

  if (ivStatus === "processing") {
    console.log("redirecting to processing");
    return redirect(`/dashboard/investment/processing/${id}`);
  }

  const packageDurationDays = INVESTMENT_PLANS.find(
    (plan) =>
      plan.packageName.toLowerCase() === investmentPackage.toLowerCase(),
  )?.durationDays;

  const roiP = INVESTMENT_PLANS.find(
    (plan) =>
      plan.packageName.toLowerCase() === investmentPackage.toLowerCase(),
  )?.roiPercent;

  const roi = amount * ((roiP as number) / 100);

  if (!packageDurationDays || !createdAt || !roi) {
    return redirect("/dashboard/investment");
  }

  return (
    <div className="flex flex-col gap-5">
      <HeaderScroll />
      <div className="h-[400px] w-full sm:h-[500px]">
        <TradingViewWidget />
      </div>

      <IvSimulator
        roi={roi}
        packageDurationDays={packageDurationDays}
        investment={investment}
      />

      <Link
        href="/dashboard/investment"
        className="flex items-center justify-center gap-2 rounded-lg bg-[#1A5B4C] px-5 py-2 text-white shadow-sm"
      >
        View all Investments
      </Link>
    </div>
  );
}

export default InvestmentPage;
