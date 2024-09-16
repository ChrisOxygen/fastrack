"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiPower, FiUserCheck, FiX } from "react-icons/fi";
import DashboardMenu from "./DashboardMenu";
import { signOut } from "next-auth/react";
import useFetchUserData from "@/hooks/useFetchUserData";
import { UserData } from "@/app/dashboard/layout";
import SideBarMenuItem from "./SideBarMenuItem";
import { useRouter } from "next/navigation";

function MobileMenu({ location }: { location: "landing" | "dashboard" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const myRef = useRef<null | HTMLDivElement>(null);
  const { data } = useFetchUserData();

  const router = useRouter();

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if ((event.target as HTMLElement).closest(".screen-link")) {
        setMenuOpen(false);
      }
    };

    if (menuOpen && myRef?.current) {
      myRef.current.addEventListener("click", handleDocumentClick);
    }

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [menuOpen]);

  const { email, firstName, lastName } = data as UserData;

  function handleMenuToggle() {
    setMenuOpen((prev) => !prev);
  }
  return (
    <>
      <button
        className="z-[600] mt-[-2px] text-2xl text-siteHeadingDark"
        onClick={() => handleMenuToggle()}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
      <div
        ref={myRef}
        className={` ${menuOpen ? "flex" : "hidden"} fixed right-0 top-0 h-screen w-full flex-row-reverse bg-black/40 backdrop-blur-sm`}
      >
        <div
          className={`flex h-screen w-[75%] flex-col justify-between bg-white p-5`}
        >
          <div className="flex w-full items-center justify-between">
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
          </div>
          <div className="w-full">
            {/* <nav className="w-full">
              <menu className="flex flex-col items-center justify-center gap-6 font-syne text-4xl font-bold">
                <li className="">
                  <Link href="/about">About</Link>
                </li>
                <li className="">
                  <Link href="/faq">FAQ</Link>
                </li>
                <li className="">
                  <Link href="/contacts">Contacts</Link>
                </li>
              </menu>
            </nav> */}
            <div className="flex h-full flex-col items-end gap-2">
              <p className="my-4 font-dm_sans text-sm text-siteHeadingDark/50">
                GENERAL
              </p>
              <menu className="flex h-full flex-col items-end gap-2">
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
          </div>

          <div
            className={` ${location === "landing" ? "flex" : "hidden"} items-center justify-center gap-3`}
          >
            <Link
              href="/login"
              className="rounded-lg border border-siteHeadingDark bg-transparent px-4 py-1 font-dm_sans font-bold text-siteGreen"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="rounded-lg border border-siteGreen bg-siteGreen px-4 py-1 font-dm_sans font-bold text-siteLemon"
            >
              Sign up
            </Link>
          </div>
          <div
            className={` ${location === "dashboard" ? "flex" : "hidden"} items-center justify-center gap-3`}
          >
            <div className="flex w-full flex-col items-center border-t-1 border-siteHeadingDark/25 py-4">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
