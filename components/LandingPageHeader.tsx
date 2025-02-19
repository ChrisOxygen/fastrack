"use client";

import Image from "next/image";
import DesktopMenu from "./DesktopMenu";
import Link from "next/link";
import HeaderAuthBox from "./HeaderAuthBox";
import MobileMenu from "./MobileMenu";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import clsx from "clsx";
import { useSession } from "next-auth/react";

function LandingPageHeader() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isNotAtTop, setIsNotAtTop] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous! && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    if (latest > 50) {
      setIsNotAtTop(true);
    } else {
      setIsNotAtTop(false);
    }
  });

  return (
    <motion.header
      className={clsx(
        "fixed top-0 z-50 flex h-[86px] w-full items-center justify-between",

        isNotAtTop ? "bg-white shadow-md" : "bg-transparent",
      )}
      variants={{
        hidden: {
          y: "-100%",
        },
        visible: {
          y: 0,
          transition: {
            duration: 0.3,
          },
        },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="mx-auto flex w-full items-center justify-between px-6 md:container">
        <Link
          href="/"
          className="mr-auto flex gap-2 text-center font-syne text-xl font-bold md:mr-0"
        >
          <Image
            src="/fastrack-green.png"
            alt="Fastrack"
            width={150}
            height={10}
          />
        </Link>

        <DesktopMenu />
        <HeaderAuthBox />

        <div className="block md:hidden">
          <MobileMenu location="landing" />
        </div>
      </div>
    </motion.header>
  );
}

export default LandingPageHeader;
