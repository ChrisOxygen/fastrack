import Image from "next/image";
import React from "react";

function InvestorstAndPartners() {
  return (
    <div className="relative grid w-full place-items-center bg-siteGreen py-[60px] md:py-[100px]">
      <div className="mx-auto flex w-full items-center justify-between gap-5 px-6 md:container">
        <div className="block">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/brand-1.svg"
            alt="Kudizen"
            width={184}
            height={23}
          />
        </div>

        <div className="block">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/brand-2.svg"
            alt="Kudizen"
            width={184}
            height={23}
          />
        </div>
        <div className="hidden md:block">
          <Image
            className="-mt-8 object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/brand-3.svg"
            alt="Kudizen"
            width={184}
            height={23}
          />
        </div>
        <div className="hidden md:block">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/brand-4.svg"
            alt="Kudizen"
            width={184}
            height={23}
          />
        </div>
        <div className="hidden lg:grid">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/brand-5.svg"
            alt="Kudizen"
            width={184}
            height={23}
          />
        </div>
      </div>
    </div>
  );
}

export default InvestorstAndPartners;
