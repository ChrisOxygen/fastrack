"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

import LandingMenuContent from "./LandingMenuContent";
import DashboardMenuContent from "./DashboardMenuContent";
import { CgMenuLeft } from "react-icons/cg";

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
      <button
        className="z-[6000] ml-2 grid place-items-center text-4xl text-siteGreen"
        onClick={() => handleMenuToggle()}
      >
        {menuOpen ? <FiX /> : <CgMenuLeft />}
      </button>
      <div
        ref={myRef}
        className={` ${menuOpen ? "flex" : "hidden"} fixed right-0 top-0 z-[100] h-screen w-full flex-row-reverse bg-black/40 backdrop-blur-sm`}
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
                alt="Fastrack"
                width={150}
                height={10}
              />
            </Link>

            <button
              className="z-[6000] mt-[-2px] text-2xl text-siteHeadingDark"
              onClick={() => handleMenuToggle()}
            >
              {menuOpen ? <FiX /> : <FiMenu />}
            </button>
          </div>
          {location === "landing" && <LandingMenuContent />}
          {location === "dashboard" && <DashboardMenuContent />}
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
