"use client";

import Image from "next/image";
import Link from "next/link";
import { Toaster } from "react-hot-toast";

import MobileMenu from "@/components/MobileMenu";
import DashboardMenu from "@/components/DashboardMenu";
import { COPYRIGHT_TEXT } from "@/constants";

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
  return (
    <div className="flex w-full flex-col">
      <header className="flex h-[60px] items-center justify-between border-b border-siteHeadingDark/30 bg-white p-5 lg:hidden">
        <Link
          href="/dashboard"
          className="flex gap-2 text-center font-syne text-xl font-bold"
        >
          <Image
            src="/fastrack-green.png"
            alt="fastrack logo"
            width={150}
            height={10}
            className="h-auto w-auto"
          />
        </Link>
        <MobileMenu location="dashboard" />
      </header>
      <main className="block h-full grid-cols-[260px_1fr] lg:grid lg:h-screen lg:overflow-hidden xl:grid-cols-[350px_1fr]">
        <DashboardMenu device="desktop" />
        <section className="grid h-full min-h-[calc(100dvh-60px)] w-full grid-rows-1 overflow-auto p-4 lg:max-h-[1080px]">
          {children}
          <footer className="mt-10 block lg:hidden">
            <div className="flex items-center justify-between border-t border-siteHeadingDark/30 py-4">
              <p className="text-xs text-siteHeadingDark">{COPYRIGHT_TEXT}</p>
              <p className="text-xs text-siteHeadingDark">
                <Link href="/privacy" className="text-siteGreen">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </footer>
        </section>
      </main>
      <Toaster />
    </div>
  );
}

export default DashboardLayout;
