import { MAIN_NAV_LINKS } from "@/constants";
import clsx from "clsx";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { HTMLAttributes, HTMLProps } from "react";

type MenuProps = {
  location: "desktop" | "mobile" | "footer";
  handleMenuToggle: () => void;
};

function Menu({ location, handleMenuToggle }: MenuProps) {
  const pathName = usePathname();

  console.log(pathName);
  const listClasses = clsx(
    "flex",
    location === "desktop" && "items-center justify-center gap-8 font-semibold",
    location === "mobile" && "flex-col items-center gap-4",
    location === "footer" && "flex-col items-center gap-4",
  );

  return (
    <menu className={listClasses}>
      {MAIN_NAV_LINKS.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          onClick={handleMenuToggle}
          className={clsx(
            "",
            location === "footer" &&
              "text-xl font-semibold transition-all hover:text-siteOrange",
            location === "desktop" &&
              "text-black transition-all hover:text-siteOrange",
            location === "mobile" && "text-2xl font-bold",
            pathName === link.href && "text-siteOrange",
          )}
        >
          {link.title}
        </Link>
      ))}
    </menu>
  );
}

export default Menu;
