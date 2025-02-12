"use client";

import { FiActivity } from "react-icons/fi";
import TransactionRow from "./TransactionRow";
import useUserTransactions from "@/hooks/useUserTransactions";
import LoadingSpinner from "./LoadingSpinner";
import { Skeleton } from "./ui/skeleton";

function RecentActivity() {
  const { transactionsData, useTransactionStatus } = useUserTransactions();

  if (useTransactionStatus === "pending")
    return <Skeleton className="h-full w-full rounded-2xl" />;

  const { userTransactions } = transactionsData!;

  return (
    <div className="flex h-full flex-col gap-3 overflow-hidden rounded-2xl border border-siteHeadingDark/25">
      <div className="p-5">
        <div className="flex items-center gap-2 font-semibold text-siteHeadingDark">
          <span className="font-semibold text-siteGreen">
            <FiActivity />
          </span>
          Recent Activity
        </div>
      </div>
      <div
        className={`grid1364:grid-cols-[minmax(200px,300px)_minmax(70px,200px)_minmax(80px,200px)_minmax(110px,250px)_minmax(50px,140px)_minmax(70px,140px)] grid1364:gap-3 hidden w-full justify-between gap-0 border-y border-siteHeadingDark/20 px-5 py-2 sm:grid sm:grid-cols-[minmax(200px,300px)_minmax(70px,200px)_minmax(80px,200px)_minmax(110px,250px)_minmax(50px,140px)_minmax(70px,140px)] lg:grid-cols-[minmax(180px,300px)_minmax(70px,200px)_minmax(80px,200px)_minmax(0,250px)_minmax(0,140px)_minmax(70px,140px)]`}
      >
        <span className="text-sm text-siteHeadingDark/60">TYPE</span>
        <span className="justify-self-center text-sm text-siteHeadingDark/60">
          AMOUNT
        </span>
        <span className="justify-self-center text-sm text-siteHeadingDark/60">
          STATUS
        </span>
        <span className="grid1364:block block justify-self-center text-sm text-siteHeadingDark/60 lg:hidden">
          TRANS.ID
        </span>
        <span className="grid1364:block block justify-self-center text-sm text-siteHeadingDark/60 lg:hidden">
          FEE
        </span>

        <span className="col-start-6 block w-[40px] justify-self-center text-sm text-siteHeadingDark/60"></span>
      </div>
      <div className="flex h-full flex-col gap-2 overflow-scroll px-5">
        {userTransactions.map((transaction, index) => (
          <TransactionRow
            key={index}
            isLast={userTransactions.length - 1 === index}
            isFirst={index === 0}
            transaction={transaction}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentActivity;
