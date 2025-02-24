"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import LandingMenuContent from "./LandingMenuContent";
import DashboardMenuContent from "./DashboardMenuContent";
import { CgMenuLeft } from "react-icons/cg";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MobileMenuItem from "./MobileMenuItem";
import UserProfileBox from "./UserProfileBox";
import { COPYRIGHT_TEXT } from "@/constants";

function MobileMenu({ location }: { location: "landing" | "dashboard" }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const myRef = useRef<null | HTMLDivElement>(null);

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

  function handleMenuToggle() {
    setMenuOpen((prev) => !prev);
  }
  return (
    <>
      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetTrigger className="ml-2 grid place-items-center text-4xl text-siteGreen">
          <CgMenuLeft />
        </SheetTrigger>
        <SheetContent className="grid grid-rows-[50px_1fr]" side={"left"}>
          <SheetHeader className="border-b">
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
          </SheetHeader>
          <SheetTitle className="hidden">Menu</SheetTitle>
          <div className="row-start-2 flex h-full flex-col justify-between self-stretch">
            {location === "landing" && (
              <LandingMenuContent handleMenuToggle={handleMenuToggle} />
            )}
            {location === "dashboard" && (
              <div className="flex h-full flex-col">
                <menu className="flex h-full flex-col gap-1">
                  <MobileMenuItem
                    handleMenuToggle={handleMenuToggle}
                    tabTitle="dashboard"
                  />
                  <MobileMenuItem
                    handleMenuToggle={handleMenuToggle}
                    tabTitle="all transactions"
                  />
                  <MobileMenuItem
                    handleMenuToggle={handleMenuToggle}
                    tabTitle="deposit"
                  />
                  <MobileMenuItem
                    handleMenuToggle={handleMenuToggle}
                    tabTitle="investment"
                  />
                  <MobileMenuItem
                    handleMenuToggle={handleMenuToggle}
                    tabTitle="withdraw"
                  />
                  <MobileMenuItem
                    handleMenuToggle={handleMenuToggle}
                    tabTitle="referrals"
                  />
                  {/* <MobileMenuItem tabTitle="settings" /> */}
                  <MobileMenuItem
                    handleMenuToggle={handleMenuToggle}
                    tabTitle="support"
                  />
                </menu>
                <div className="flex w-full flex-col items-center border-siteHeadingDark/25 py-4">
                  <UserProfileBox />
                  <span className="">{COPYRIGHT_TEXT}</span>
                </div>
              </div>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default MobileMenu;
