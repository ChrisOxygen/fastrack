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
import MobileMenu from "@/components/MobileMenu";
import { Spinner } from "@nextui-org/react";
import LoadingSpinner from "@/components/LoadingSpinner";
import DashboardMenu from "@/components/DashboardMenu";

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
    return <LoadingSpinner />;
  }

  return (
    <div className="flex w-full flex-col">
      <header className="flex items-center justify-between border-b border-siteHeadingDark/30 bg-white p-5 lg:hidden">
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
        <MobileMenu location="dashboard" />
      </header>
      <main className="block h-full grid-cols-[260px_1fr] lg:grid lg:h-screen lg:overflow-hidden xl:grid-cols-[350px_1fr]">
        <DashboardMenu device="desktop" />
        <section className="h-full max-h-[1080px] w-full overflow-auto p-4 lg:h-screen lg:overflow-hidden">
          {children}
        </section>
      </main>
      <Toaster />
    </div>
  );
}

export default DashboardLayout;
