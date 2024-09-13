"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

function MobileMenu({ location }: { location: "landing" | "dashboard" }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function handleMenuToggle() {
    setMenuOpen((prev) => !prev);
  }
  return (
    <>
      <button
        className="z-[400] mt-[-2px] text-2xl text-siteHeadingDark"
        onClick={() => handleMenuToggle()}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>
      <div
        className={` ${menuOpen ? "flex" : "hidden"} fixed right-0 top-0 h-screen w-full flex-row-reverse bg-black/40`}
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
            <nav className="w-full">
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
            </nav>
          </div>

          <div className="flex items-center justify-center gap-3">
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
        </div>
      </div>
    </>
  );
}

export default MobileMenu;
