"use client";

import InvestmentsDisplay from "@/components/InvestmentsDisplay";
import LoadingSpinner from "@/components/LoadingSpinner";
import TotalBalanceSect from "@/components/TotalBalanceSect";
import useFetchUserData from "@/hooks/useFetchUserData";
import { getUserInvestments } from "@/utils/actions/investment.actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";

function Investment() {
  const { data: session, status } = useSession();
  const {
    data: investments,
    error,
    status: investmentsStatus,
  } = useQuery({
    queryKey: ["user", "userTransactions"],
    queryFn: () => {
      return getUserInvestments(session?.user?.id!);
    },
    enabled: !!session?.user.id,
  });

  if (status === "unauthenticated") {
    redirect("/login");
  }
  if (investmentsStatus === "pending" || status === "loading")
    return <LoadingSpinner />;

  const hasInvestments = investments.length > 0;

  console.log("investments", investments);

  return (
    <div className="flex flex-col gap-5">
      <TotalBalanceSect isInvestmenyPage={true} />
      {hasInvestments ? (
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(200px,300px)]">
          
              <InvestmentsDisplay investments={investments} />
          <div className="">
            <div className="flex flex-col gap-2">
              <div className="mt-5 flex flex-col gap-2 rounded-xl border border-siteHeadingDark/25 bg-gray-50 px-5 pb-5 hover:shadow-sm">
                <span className="mt-[-12px] w-max rounded-md border border-siteHeadingDark/25 bg-siteGreen px-3 py-[2px] font-dm_sans font-bold text-white">
                  Silver
                </span>
                <div className="flex flex-col">
                  <div className="flex items-center justify-between border-b border-siteHeadingDark/25 py-3">
                    <span className="font-dm_sans font-semibold text-siteGreen">
                      Duration
                    </span>
                    <span className="font-dm_sans">4 Days</span>
                  </div>
                  <div className="flex items-center justify-between border-siteHeadingDark/25 py-3">
                    <span className="font-dm_sans font-semibold text-siteGreen">
                      Minimum Amount
                    </span>
                    <span className="font-dm_sans">$100</span>
                  </div>

                  <Link
                    href={"/dashboard/investment/create/silver"}
                    className="rounded-md bg-siteGreen p-2 text-center font-dm_sans font-bold text-white"
                  >
                    Invest Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <h2 className="font-dm_sans text-2xl font-bold text-siteHeadingDark">
              No Active Investments
            </h2>
            <p className="text-sm text-gray-500">
              You currently have no active investments. Start investing to earn
              more.
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-dm_sans text-xl font-bold text-siteHeadingDark">
              Invest Now
            </span>
            <div className="mt-5 flex flex-col gap-2 rounded-xl border border-siteHeadingDark/25 bg-gray-50 px-5 pb-5 hover:shadow-sm">
              <span className="mt-[-12px] w-max rounded-md border border-siteHeadingDark/25 bg-siteGreen px-3 py-[2px] font-dm_sans font-bold text-white">
                Silver
              </span>
              <div className="flex flex-col">
                <div className="flex items-center justify-between border-b border-siteHeadingDark/25 py-3">
                  <span className="font-dm_sans font-semibold text-siteGreen">
                    Duration
                  </span>
                  <span className="font-dm_sans">4 Days</span>
                </div>
                <div className="flex items-center justify-between border-siteHeadingDark/25 py-3">
                  <span className="font-dm_sans font-semibold text-siteGreen">
                    Minimum Amount
                  </span>
                  <span className="font-dm_sans">$100</span>
                </div>

                <Link
                  href={"/dashboard/investment/create/silver"}
                  className="rounded-md bg-siteGreen p-2 text-center font-dm_sans font-bold text-white"
                >
                  Invest Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Investment;
