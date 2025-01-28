import Image from "next/image";
import React from "react";

function InvestorstAndPartners() {
  return (
    <div className="relative grid w-full place-items-center bg-siteGreen py-[60px] md:py-[100px]">
      <div className="animate-scroll mx-auto flex w-full items-center justify-between gap-5 px-6">
        <div className="block">
          <Image
            className="opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/partner-brand-1-1.png"
            alt="Fastrack"
            width={184}
            height={23}
          />
        </div>

        <div className="block">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/partner-brand-2-2.png"
            alt="Fastrack"
            width={184}
            height={23}
          />
        </div>
        <div className="hidden md:block">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/partner-brand-3-2.png"
            alt="Fastrack"
            width={184}
            height={23}
          />
        </div>
        <div className="hidden md:block">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/partner-brand-4-2.png"
            alt="Fastrack"
            width={184}
            height={23}
          />
        </div>
        <div className="hidden lg:grid">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/partner-brand-5-2.png"
            alt="Fastrack"
            width={184}
            height={23}
          />
        </div>
        <div className="hidden lg:grid">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/partner-brand-6-2.png"
            alt="Fastrack"
            width={184}
            height={23}
          />
        </div>
        <div className="hidden lg:grid">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/partner-brand-7-2.png"
            alt="Fastrack"
            width={184}
            height={23}
          />
        </div>
        <div className="hidden lg:grid">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/partner-brand-8-2.png"
            alt="Fastrack"
            width={184}
            height={23}
          />
        </div>
        <div className="hidden lg:grid">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/partner-brand-9-2.png"
            alt="Fastrack"
            width={184}
            height={23}
          />
        </div>
        <div className="hidden lg:grid">
          <Image
            className="h-44 object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/partner-brand-10-2.png"
            alt="Fastrack"
            width={184}
            height={23}
          />
        </div>
        <div className="hidden lg:grid">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/partner-brand-10-2.png"
            alt="Fastrack"
            width={184}
            height={23}
          />
        </div>
        <div className="hidden lg:grid">
          <Image
            className="object-contain opacity-50 brightness-0 invert transition-all hover:opacity-100"
            src="/assets/partner-brand-10-2.png"
            alt="Fastrack"
            width={184}
            height={23}
          />
        </div>
      </div>
    </div>
  );
}

export default InvestorstAndPartners;
