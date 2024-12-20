"use client";
import Link from "next/link";

import { MAIN_NAV_LINKS } from "@/constants";
import { use } from "react";
import { usePathname } from "next/navigation";
import clsx from "clsx";

function DesktopMenu() {
  const pathName = usePathname();
  return (
    <nav className="hidden md:block">
      <menu className="flex items-center justify-center gap-8 font-semibold">
        {MAIN_NAV_LINKS.map((link, index) => (
          <Link
            key={index}
            href={link.href}
            className={clsx(
              "hover:text-siteOrange text-black transition-all",
              pathName === link.href && "text-siteOrange hover:text-siteOrange",
            )}
          >
            {link.title}
          </Link>
        ))}
      </menu>
    </nav>
  );
}

export default DesktopMenu;
