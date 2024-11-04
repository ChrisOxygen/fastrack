import LandingPageHeader from "@/components/LandingPageHeader";

import Image from "next/image";
import Link from "next/link";

function LandingPage() {
  console.log("LandingPage");
  return (
    <main
      className="relative h-screen overflow-hidden bg-siteBg bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: "url('/Lines-No-Background.png')",
      }}
    >
      <span className="absolute bottom-0 left-0 right-0 top-0 z-[2] bg-siteBg opacity-95"></span>
      <div className="relative z-50 mx-auto flex flex-col items-center px-5 py-5 lg:container xl:px-0">
        <LandingPageHeader />
        <h1 className="mt-20 text-center font-syne text-4xl font-bold sm:text-5xl">
          Easy Transactions <br /> and Investments
        </h1>
        <p className="text-center font-dm_sans text-siteHeadingDark/60">
          Guaranteed revenue growth and seemless transactions
        </p>
        <div className="mb-8 mt-5 flex w-full flex-col items-center gap-3 sm:w-72 sm:flex-row sm:gap-5">
          <Link
            href="/signup"
            className="heroBtn w-full bg-siteHeadingDark font-medium text-white hover:bg-siteGreen"
          >
            Start for free
          </Link>
          <Link
            href="/login"
            className="heroBtn w-full bg-transparent font-medium text-siteHeadingDark hover:text-siteGreen"
          >
            login
          </Link>
        </div>
      </div>
      <div className="relative z-10 mx-auto flex w-full justify-center px-5 py-5 lg:container xl:px-0">
        <Image
          className="rounded-lg border-[8px] border-transparent bg-gradient-to-r from-siteGreen to-siteLemon bg-cover bg-center"
          src="/app-image.png"
          alt="hero"
          width={1000}
          height={500}
        />
      </div>
    </main>
  );
}

export default LandingPage;
