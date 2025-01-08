"use client";

import Image from "next/image";
import CustomButton from "./ui/CustomButton";
import { usePathname } from "next/navigation";
import { MAIN_NAV_LINKS } from "@/constants";
import Link from "next/link";
import clsx from "clsx";

function CtaFooter() {
  const pathName = usePathname();
  return (
    <div className="relative flex w-full overflow-hidden bg-[#045046] pb-8 pt-[100px] after:absolute after:left-[10px] after:top-0 after:h-full after:w-full after:bg-[url('/assets/green-curve.svg')] after:bg-no-repeat md:pb-0 md:after:left-[50px]">
      <div className="mx-auto flex w-full flex-col items-center justify-between gap-4 px-6 md:container">
        <div className="relative z-10 flex flex-col items-center gap-3 text-white">
          <span className="font-archivo font-semibold">
            WE HELP YOU ON EVERY STEP OF THE JOURNEY
          </span>
          <h3 className="mb-5 text-center font-archivo text-3xl font-bold text-white md:text-5xl">
            Get Started Today.
            <br /> Boost Revenue With Finwave
          </h3>
          <CustomButton
            text="Get Started Today"
            bgColor="orange"
            hoverBgColor="white"
            textColor="black"
          />
        </div>
        <div className="z-20 mt-20 flex w-full flex-col items-center gap-10 rounded-3xl bg-[#006D5B] p-20">
          <Image
            className="object-contain opacity-100 brightness-0 invert transition-all"
            src="/fastrack-white.png"
            alt="Fastrack"
            width={200}
            height={52}
          />
          <nav className="my-6 min-w-[300px] border-y border-white/20 py-6">
            <menu className="flex flex-col items-center justify-center gap-8 font-semibold">
              {MAIN_NAV_LINKS.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className={clsx(
                    "text-white transition-all hover:text-siteOrange",
                    pathName === link.href &&
                      "text-siteOrange hover:text-siteOrange",
                  )}
                >
                  {link.title}
                </Link>
              ))}
            </menu>
          </nav>
          <p className="text-center font-archivo text-white">
            Copyright© 2025 Finwave by RadiusTheme
          </p>
          <div className="">
            <Image
              className=""
              src="/assets/seal.webp"
              alt="Fastrack"
              width={200}
              height={52}
            />
          </div>
        </div>
        <Image
          className="-mb-[20px] shrink-0 object-contain opacity-5 brightness-0 invert transition-all md:shrink"
          src="/fastrack-white.png"
          alt="Fastrack"
          width={2900}
          height={52}
        />
      </div>
    </div>
  );
}

export default CtaFooter;
