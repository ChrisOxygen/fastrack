"use client";

import InBoxLoader from "@/components/InBoxLoader";
import { ScrollArea } from "@/components/ui/scroll-area";
import { getInvestment } from "@/utils/actions/investment.actions";
import { useQuery } from "@tanstack/react-query";
import clsx from "clsx";
import { useSession } from "next-auth/react";
import { redirect, useParams } from "next/navigation";
import { BiCopy } from "react-icons/bi";

import { INVESTMENT_PLANS } from "@/constants";
import CustomButton from "@/components/ui/CustomButton";
import { CgArrowRight } from "react-icons/cg";

function CompletedInvestment() {
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

  if (status === "loading" || queryStatus === "pending") return <InBoxLoader />;
  if (status === "unauthenticated") {
    redirect("/login");
  }

  const {
    amount,
    investmentPackage,
    returns,
    status: investmentStatus,
    createdAt,
    updatedAt,
  } = investment;

  const startDate = new Date(createdAt).toDateString();
  const endDate = new Date(updatedAt).toDateString();

  const duration =
    INVESTMENT_PLANS.find(
      (plan) => plan.packageName.toLowerCase() === investmentPackage,
    )?.durationDays ?? "Not available";

  const roi =
    INVESTMENT_PLANS.find(
      (plan) => plan.packageName.toLowerCase() === investmentPackage,
    )?.roiPercent ?? "Not available";
  return (
    <div className="w-full">
      <ScrollArea className="h-full w-full lg:h-[800px]">
        <div className="flex w-full flex-col gap-5">
          <div className="flex justify-between gap-3 px-4 font-dm_sans text-xl font-bold text-siteHeadingDark sm:items-center sm:gap-0 sm:px-5 sm:text-3xl">
            <h4 className="text-siteGreen">Investment</h4>
            <span
              className={clsx(
                "grid place-items-center justify-self-center rounded-xl border px-2 py-[2px] text-xs uppercase",
                investmentStatus === "running" &&
                  "border-orange-200 bg-orange-100 text-orange-500",
                investmentStatus === "completed" &&
                  "border-green-200 bg-green-100 text-green-500",
                investmentStatus === "pending" &&
                  "border-gray-200 bg-gray-100 text-gray-500",
              )}
            >
              {investmentStatus}
            </span>
          </div>
          <div className="flex h-full flex-col gap-1 rounded-xl border border-siteHeadingDark/25 p-4 sm:p-5">
            <div className="flex w-full items-center justify-between font-dm_sans text-siteHeadingDark">
              <span className="text-xl font-bold capitalize sm:text-2xl">
                Investment amount
              </span>
              <span className="text-xl font-bold capitalize sm:text-2xl">
                ${amount}
              </span>
            </div>
            <div className="flex w-full items-center justify-between font-dm_sans text-siteHeadingDark/50">
              <span className="font-bold capitalize">Investment Returns</span>
              <span className="font-bold capitalize"> +${returns}</span>
            </div>
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="relative w-full border-b border-siteHeadingDark/25 p-5">
              <span className="after:content-[' '] relative grid w-32 place-items-center font-dm_sans text-xl font-bold text-siteHeadingDark after:absolute after:bottom-[-20px] after:left-0 after:block after:h-[4px] after:w-32 after:bg-siteGreen">
                Details
              </span>
            </div>
            <div className="flex w-full flex-col gap-2 p-5">
              <div className="flex items-center justify-between border-b-2 border-dashed border-siteHeadingDark/25 py-3 font-dm_sans">
                <span className="text-lg font-semibold text-siteHeadingDark/70">
                  Ivestment Package
                </span>
                <div className="flex items-center gap-2 text-lg font-black text-black">
                  <span className="capitalize">{investmentPackage}</span>
                </div>
              </div>
              <div className="flex flex-wrap items-center justify-between border-b-2 border-dashed border-siteHeadingDark/25 py-3 font-dm_sans">
                <span className="text-lg font-semibold text-siteHeadingDark/70">
                  Duration
                </span>
                <div className="flex items-center gap-2 text-lg font-black text-black">
                  <span className="">{duration} days</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-b-2 border-dashed border-siteHeadingDark/25 py-3 font-dm_sans">
                <span className="text-lg font-semibold text-siteHeadingDark/70">
                  Start Date
                </span>
                <div className="flex items-center gap-2 text-lg font-black text-black">
                  <span className="">{startDate}</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-b-2 border-dashed border-siteHeadingDark/25 py-3 font-dm_sans">
                <span className="text-lg font-semibold text-siteHeadingDark/70">
                  End Date
                </span>
                <div className="flex items-center gap-2 text-lg font-black text-black">
                  <span className="">{endDate}</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-b-2 border-dashed border-siteHeadingDark/25 py-3 font-dm_sans">
                <span className="text-lg font-semibold text-siteHeadingDark/70">
                  ROI(%)
                </span>
                <div className="flex items-center gap-2 text-lg font-black text-black">
                  <span className="">{roi}%</span>
                </div>
              </div>
              <div className="mt-6 flex w-full items-center gap-6">
                <CustomButton
                  href="/investment/create"
                  text="Invest Again"
                  iconPosition="right"
                  bgColor="orange"
                  hoverBgColor="green"
                  textColor="black"
                  icon={<CgArrowRight />}
                />
                <CustomButton
                  href="/dashboard"
                  text="Go to dashboard"
                  bgColor="green"
                  hoverBgColor="orange"
                  textColor="white"
                />
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}

export default CompletedInvestment;
