"use client";

import SideBarMenuItem from "@/components/SideBarMenuItem";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { BiExit } from "react-icons/bi";
import { signOut } from "next-auth/react";
import { FiPower, FiUserCheck } from "react-icons/fi";
import { GoMoveToStart } from "react-icons/go";

import useFetchUserData from "@/hooks/useFetchUserData";
import { useTabSwitch } from "@/contex/TabSwitchProvider";

// const screenViewList = [
//   "Dashboard",
//   "All Transactions",
//   "Add Money",
//   "Send Money",
//   "Withdraw",
//   "Referral",
//   "Settings",
//   "Support Tickets",
// ];

export type TransactionType = {
  transactionId: string;
  type: string;
  amount: number;
  status: string;
  fee: number;
  createdAt: string;
  updatedAt: string;
};

export type UserData = {
  email: string;
  firstName: string;
  lastName: string;
  transactions: TransactionType[];
  referralCode: string;
  balance: number;
};

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data, error, status } = useFetchUserData();

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  const { email, firstName, lastName } = data as UserData;
  return (
    <>
      <main className="block h-full grid-cols-[260px_1fr] lg:grid lg:h-screen lg:overflow-hidden xl:grid-cols-[350px_1fr]">
        <aside className="hidden flex-col bg-siteBg p-5 lg:flex">
          <div className="flex items-center justify-between border-b-1 border-siteHeadingDark/25 py-4">
            <Link
              href="/"
              className="flex gap-2 text-center font-syne text-xl font-bold"
            >
              <Image
                src="/fastrack-green.png"
                alt="Kudizen"
                width={150}
                height={10}
              />
            </Link>

            <button
              className="rounded-md border border-siteHeadingDark/25 bg-white/50 p-2 text-siteGreen"
              onClick={() => signOut()}
            >
              <GoMoveToStart />
            </button>
          </div>
          <div className="flex h-full flex-col gap-2">
            <p className="my-4 font-dm_sans text-sm text-siteHeadingDark/50">
              GENERAL
            </p>
            <menu className="flex h-full flex-col gap-2">
              <SideBarMenuItem tabTitle="dashboard" />
              <SideBarMenuItem tabTitle="all transactions" />
              <SideBarMenuItem tabTitle="deposit" />
              <SideBarMenuItem tabTitle="transfer" />
              <SideBarMenuItem tabTitle="withdraw" />
              <SideBarMenuItem tabTitle="referrals" />
              <SideBarMenuItem tabTitle="settings" />
              <SideBarMenuItem tabTitle="support" />
            </menu>
          </div>

          <div className="flex flex-col items-center border-t-1 border-siteHeadingDark/25 py-4">
            <div className="mb-2 grid w-full grid-cols-[1fr_120px_1fr] items-center justify-center gap-2 rounded-lg bg-white p-3 shadow xl:grid-cols-[1fr_197px_1fr]">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-siteHeadingDark/25">
                <FiUserCheck />
              </span>
              <div className="flex flex-col items-start">
                <span className="text-sm font-semibold">
                  {`${firstName} ${lastName}`}
                </span>
                <span className="w-full overflow-hidden text-ellipsis">
                  {email}
                </span>
              </div>
              <button
                className="grid place-items-center text-xl text-red-700"
                onClick={() => signOut()}
              >
                <FiPower />
              </button>
            </div>
            <span className="">2024 Kudizen </span>
          </div>
        </aside>
        <section className="h-full max-h-[1080px] w-full overflow-auto p-4 lg:h-screen lg:overflow-hidden">
          {children}
        </section>
      </main>
      <Toaster />
    </>
  );
}

export default DashboardLayout;
