"use client";

import HeaderScroll from "@/components/HeaderScroll";
import IvTrading from "@/components/IvTrading";
import LoadingSpinner from "@/components/LoadingSpinner";
import TestIvSim from "@/components/IvSim";
import TradingViewWidget from "@/components/TradingViewWidget";
import { getInvestment } from "@/utils/actions/investment.actions";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import React from "react";
import Link from "next/link";

function InvestmentPage() {
  const { id } = useParams();
  const { data: session, status } = useSession();
  const {
    data: investment,
    error,
    status: queryStatus,
  } = useQuery({
    queryKey: ["user", "invetment"],
    queryFn: () => {
      return getInvestment(id as string);
    },
    enabled: !!session?.user.id,
  });

  if (status === "loading" || queryStatus === "pending")
    return <LoadingSpinner />;
  if (status === "unauthenticated") {
    redirect("/login");
  }

  return (
    <div className="flex flex-col gap-5">
      {/* <TestIvSim /> */}
      <HeaderScroll />
      <div className="h-[400px] w-full sm:h-[500px]">
        <TradingViewWidget />
      </div>
      <IvTrading investment={investment} />

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
