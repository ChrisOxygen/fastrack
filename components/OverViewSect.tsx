"use client";

import { UserData } from "@/app/dashboard/layout";
import useFetchUserData from "@/hooks/useFetchUserData";
import {
  FiArrowDown,
  FiArrowDownRight,
  FiCornerUpRight,
  FiDollarSign,
  FiFolder,
  FiGift,
  FiLoader,
  FiTrendingUp,
} from "react-icons/fi";
import LoadingSpinner from "./LoadingSpinner";
import useUserOverview from "@/hooks/useUserOverview";
import { Skeleton } from "./ui/skeleton";

type OverviewDataProps = {
  balance: number;
  status: "pending" | "error" | "success";
};

function OverViewSect({ balance, status }: OverviewDataProps) {
  const { overviewData, useOverviewStatus } = useUserOverview();

  if (status === "pending" || useOverviewStatus === "pending")
    return <Skeleton className="h-full w-full rounded-2xl" />;

  const {
    totalDeposit,
    totalReferralBonus,
    totalTransfer,
    numberOfTransactions,
    totalWithdrawal,
    investmentCount,
  } = overviewData!;

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-siteHeadingDark/25 px-5 py-4 2xl:px-7 2xl:py-6">
      <div className="flex items-center gap-2 font-semibold text-siteHeadingDark">
        <span className="text-siteGreen">
          <FiLoader />
        </span>
        Overview
      </div>

      <div className="flex h-full w-full justify-between p-2">
        <div className="grid-row-3 lg:grid-row-2 flex w-full grid-cols-2 flex-col sm:grid lg:grid-cols-3">
          <div className="flex items-center justify-start gap-6 border-b border-siteHeadingDark/25 px-4 py-3 xl:justify-center xl:gap-2">
            <span className="grid h-14 w-14 place-items-center rounded-full border border-siteGreen text-lg text-siteGreen lg:h-12 lg:w-12 xl:h-9 xl:w-9">
              <FiArrowDown />
            </span>
            <div className="flex flex-col items-start">
              <span className="font-syne text-3xl">${totalDeposit}</span>
              <span className="font-dm_sans">Total Deposit</span>
            </div>
          </div>
          <div className="overview-line-box border-x-0 border-b border-l-0 border-siteHeadingDark/25 sm:border-l lg:border-x">
            <span className="overview-icon">
              <FiArrowDownRight />
            </span>
            <div className="flex flex-col items-start">
              <span className="font-syne text-3xl">${totalWithdrawal}</span>
              <span className="font-dm_sans">Total Withdraws</span>
            </div>
          </div>
          <div className="overview-line-box border-b border-siteHeadingDark/25">
            <span className="overview-icon">
              <FiGift />
            </span>
            <div className="flex flex-col items-start">
              <span className="font-syne text-3xl">{totalReferralBonus}</span>
              <span className="font-dm_sans">Total Referals</span>
            </div>
          </div>
          <div className="overview-line-box border-b border-l-0 border-siteHeadingDark/25 bg-white sm:border-l lg:border-b-0 lg:border-l-0">
            <span className="overview-icon">
              <FiTrendingUp />
            </span>
            <div className="flex flex-col items-start">
              <span className="font-syne text-3xl">{investmentCount}</span>
              <span className="font-dm_sans">Total Investments</span>
            </div>
          </div>
          <div className="overview-line-box border-x-0 border-b border-siteHeadingDark/25 sm:border-b-0 lg:border-x">
            <span className="overview-icon">
              <FiCornerUpRight />
            </span>
            <div className="flex flex-col items-start">
              <span className="font-syne text-3xl">{totalTransfer}</span>
              <span className="font-dm_sans">Total Transfers</span>
            </div>
          </div>
          <div className="overview-line-box border-l-0 border-siteHeadingDark/25 bg-white sm:border-l lg:border-l-0">
            <span className="overview-icon">
              <FiFolder />
            </span>
            <div className="flex flex-col items-start">
              <span className="font-syne text-3xl">{numberOfTransactions}</span>
              <span className="font-dm_sans">All Transactions</span>
            </div>
          </div>
        </div>
        <span className="mx-5 hidden h-[200px] w-[1px] self-stretch bg-siteHeadingDark/25 xl:block"></span>

        <div className="hidden max-w-[250px] flex-col justify-center gap-3 xl:flex">
          <div className="mx-3 flex min-w-[230px] items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-siteGreen text-lg text-white">
              <FiDollarSign />
            </span>
            <div className="flex flex-col items-start gap-1">
              <span className="font-dm_sans font-bold">Main wallet</span>
              <span className="font-dm_sans text-3xl">
                ${balance.toFixed(2)}
              </span>
            </div>
          </div>
          <span className="h-[1px] w-full bg-siteHeadingDark/25"></span>
          <div className="mx-3 flex min-w-[230px] items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-siteLemon text-lg text-siteHeadingDark">
              <FiTrendingUp />
            </span>
            <div className="flex flex-col items-start gap-1">
              <span className="font-dm_sans font-bold">Profit wallet</span>
              <span className="font-dm_sans text-3xl">N/A</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OverViewSect;
