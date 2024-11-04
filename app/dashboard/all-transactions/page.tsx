"use client";

import LoadingSpinner from "@/components/LoadingSpinner";
import TransactionRow from "@/components/TransactionRow";
import { getUserTransactions } from "@/utils/actions/transaction.actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import { ScrollArea } from "@/components/ui/scroll-area";

import { useState } from "react";
import TransactionPagination from "@/components/TransactionPagination";

function AllTransactions() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: session, status } = useSession();

  const {
    data: transactions,
    error,
    status: queryStatus,
  } = useQuery({
    queryKey: ["user", "userTransactions", currentPage],
    queryFn: () => {
      return getUserTransactions(session?.user?.id!, currentPage);
    },
    enabled: !!session?.user.id,
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (status === "loading" || queryStatus === "pending")
    return <LoadingSpinner />;
  if (status === "unauthenticated") {
    redirect("/login");
  }

  const { userTransactions, numberOfTransactions } = transactions!;

  return (
    <>
      <section className="mx-auto mt-10 flex w-full max-w-[800px] flex-col gap-20">
        <div className="flex flex-col">
          <h3 className="font-syne text-4xl font-bold">All Transactions</h3>
          <span className="font-dm_sans text-siteHeadingDark/60">
            invite your friends to kudizen and both of you get rewarded
          </span>
        </div>
        <div className="flex h-full flex-col gap-3">
          <div
            className={`hidden w-full justify-between gap-0 border-y border-siteHeadingDark/20 px-5 py-2 sm:grid sm:grid-cols-[minmax(200px,300px)_minmax(70px,200px)_minmax(80px,200px)_minmax(110px,250px)_minmax(50px,140px)_minmax(70px,140px)] lg:grid-cols-[minmax(180px,300px)_minmax(70px,200px)_minmax(80px,200px)_minmax(0,250px)_minmax(0,140px)_minmax(70px,140px)] grid1364:grid-cols-[minmax(200px,300px)_minmax(70px,200px)_minmax(80px,200px)_minmax(110px,250px)_minmax(50px,140px)_minmax(70px,140px)] grid1364:gap-3`}
          >
            <span className="text-sm text-siteHeadingDark/60">TYPE</span>
            <span className="justify-self-center text-sm text-siteHeadingDark/60">
              AMOUNT
            </span>
            <span className="justify-self-center text-sm text-siteHeadingDark/60">
              STATUS
            </span>
            <span className="block justify-self-center text-sm text-siteHeadingDark/60 lg:hidden grid1364:block">
              TRANS.ID
            </span>
            <span className="block justify-self-center text-sm text-siteHeadingDark/60 lg:hidden grid1364:block">
              FEE
            </span>

            <span className="col-start-6 block w-[40px] justify-self-center text-sm text-siteHeadingDark/60"></span>
          </div>
          <ScrollArea className="gap-2 px-5 lg:h-[600px] lg:max-h-[1000px]">
            {userTransactions?.map((transaction, index) => (
              <TransactionRow
                key={index}
                isLast={userTransactions.length - 1 === index}
                transaction={transaction}
                isFirst={index === 0}
              />
            ))}
          </ScrollArea>
          <div className="flex w-[90%] items-center justify-between">
            <div className="grid place-items-center">
              <TransactionPagination
                currentPage={currentPage}
                onPageChange={handlePageChange}
                totalItems={numberOfTransactions}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AllTransactions;
