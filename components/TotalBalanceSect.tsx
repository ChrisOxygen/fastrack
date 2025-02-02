"use client";

import { UserData } from "@/app/dashboard/layout";
import useFetchUserData from "@/hooks/useFetchUserData";
import clsx from "clsx";
import Link from "next/link";
import { FiArrowUp, FiPlus, FiTrendingUp } from "react-icons/fi";
import LoadingSpinner from "./LoadingSpinner";

function TotalBalanceSect({
  isInvestmenyPage = false,
}: {
  isInvestmenyPage?: boolean;
}) {
  const { data, error, status } = useFetchUserData();

  if (status === "pending") return <LoadingSpinner />;

  const { balance } = data as UserData;
  return (
    <div
      className="relative z-[1] flex h-full items-center justify-between rounded-2xl bg-siteGreen bg-cover bg-left bg-no-repeat px-6 py-4 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-2xl before:bg-siteGreen/50 xl:px-7 xl:py-6"
      style={{
        backgroundImage: "url('/Lines-No-Background-white.png')",
      }}
    >
      <div className="z-10 flex flex-col items-start gap-2 font-dm_sans text-white">
        <span className="">Total Balance</span>
        <span className="text-4xl">${balance.toFixed(2)}</span>
      </div>
      <div
        className={clsx(
          "z-10 items-center gap-2 sm:flex",
          !isInvestmenyPage && "hidden",
        )}
      >
        {isInvestmenyPage ? (
          <Link
            href="/dashboard/investment/create"
            className="flex items-center justify-center gap-2 rounded-lg bg-siteLemon px-5 py-2 text-siteGreen shadow-sm"
          >
            <FiPlus />
            Invest Now
          </Link>
        ) : (
          <>
            <Link
              href="/dashboard/deposit"
              className="flex items-center justify-center gap-2 rounded-lg bg-siteLemon px-5 py-2 text-siteGreen shadow-sm"
            >
              <FiPlus />
              Add
            </Link>
            <Link
              href="/dashboard/investment"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#1A5B4C] px-5 py-2 text-white shadow-sm"
            >
              <FiTrendingUp />
              Investments
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default TotalBalanceSect;
