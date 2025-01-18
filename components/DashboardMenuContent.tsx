"use client";

import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { FiPower, FiUserCheck } from "react-icons/fi";
import SideBarMenuItem from "./SideBarMenuItem";
import Image from "next/image";
import useFetchUserData from "@/hooks/useFetchUserData";
import { UserData } from "@/app/dashboard/layout";
import LoadingSpinner from "./LoadingSpinner";

function DashboardMenuContent() {
  const { data, status, error } = useFetchUserData();

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  const { email, firstName, lastName } = data as UserData;

  return (
    <>
      <div className="w-full">
        <div className="flex h-full flex-col items-end gap-2">
          <menu className="flex h-full flex-col items-end gap-2">
            <SideBarMenuItem tabTitle="dashboard" />
            <SideBarMenuItem tabTitle="all transactions" />
            <SideBarMenuItem tabTitle="deposit" />
            <SideBarMenuItem tabTitle="investment" />
            <SideBarMenuItem tabTitle="withdraw" />
            <SideBarMenuItem tabTitle="referrals" />
            {/* <SideBarMenuItem tabTitle="settings" /> */}
            <SideBarMenuItem tabTitle="support" />
          </menu>
        </div>
      </div>

      <div className={`flex items-center justify-center gap-3`}>
        <div className="flex w-full flex-col items-center border-t-1 border-siteHeadingDark/25 py-4">
          <div className="mb-2 grid w-full grid-cols-[1fr_130px_1fr] items-center justify-center gap-2 rounded-lg bg-white p-3 shadow xl:grid-cols-[1fr_197px_1fr]">
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
          <span className="">2024 Fastrack </span>
        </div>
      </div>
    </>
  );
}

export default DashboardMenuContent;
