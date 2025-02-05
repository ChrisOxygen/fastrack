"use client";

import Image from "next/image";
import Link from "next/link";
import { GoMoveToStart } from "react-icons/go";
import SideBarMenuItem from "./SideBarMenuItem";

import { useRouter } from "next/navigation";

import { COPYRIGHT_TEXT, DASHBOARD_MENU_ITEMS } from "@/constants";
import UserProfileBox from "./UserProfileBox";

function DashboardMenu({ device }: { device: "mobile" | "desktop" }) {
  const router = useRouter();

  return (
    <aside
      className={`${device === "desktop" ? "hidden lg:flex" : "flex lg:hidden"} flex-col bg-siteBg p-5`}
    >
      <div className="flex items-center justify-between border-b-1 border-siteHeadingDark/25 py-4">
        <Link
          href="/"
          className="flex gap-2 text-center font-syne text-xl font-bold"
        >
          <Image
            src="/fastrack-green.png"
            alt="Fastrack"
            width={150}
            height={10}
          />
        </Link>

        <button
          className="rounded-md border border-siteHeadingDark/25 bg-white/50 p-2 text-siteGreen"
          onClick={() => router.back()}
        >
          <GoMoveToStart />
        </button>
      </div>
      <div className="flex h-full flex-col gap-2">
        <p className="my-4 font-dm_sans text-sm text-siteHeadingDark/50">
          GENERAL
        </p>
        <menu className="flex h-full flex-col gap-2">
          {DASHBOARD_MENU_ITEMS.map((item) => (
            <SideBarMenuItem key={item.tabTitle} tabTitle={item.tabTitle} />
          ))}
        </menu>
      </div>

      <div className="flex flex-col items-center border-t-1 border-siteHeadingDark/25 py-4">
        <UserProfileBox />
        <span className="">{COPYRIGHT_TEXT}</span>
      </div>
    </aside>
  );
}

export default DashboardMenu;
