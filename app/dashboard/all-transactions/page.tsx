"use client";

import { UserData } from "@/app/dashboard/layout";
import TransactionRow from "@/components/TransactionRow";
import useFetchUserData from "@/hooks/useFetchUserData";

function AllTransactions() {
  const { data, error, status } = useFetchUserData();

  const { transactions } = data as UserData;
  return (
    <section className="mx-auto mt-10 flex w-full max-w-[800px] flex-col gap-20">
      <div className="flex flex-col">
        <h3 className="font-syne text-4xl font-bold">All Transactions</h3>
        <span className="font-dm_sans text-siteHeadingDark/60">
          invite your friends to kudizen and both of you get rewarded
        </span>
      </div>
      <div className="flex h-full flex-col gap-3 overflow-scroll lg:overflow-scroll">
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
        <div className="flex h-full flex-col gap-2 overflow-scroll px-5 lg:h-[600px] lg:max-h-[1000px] lg:overflow-scroll">
          {transactions.map((transaction, index) => (
            <TransactionRow
              key={index}
              isLast={transactions.length - 1 === index}
              transaction={transaction}
              isFirst={index === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default AllTransactions;
