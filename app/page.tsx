import LandingPageHeader from "@/components/LandingPageHeader";
import { Button } from "@nextui-org/react";
import Image from "next/image";

function LandingPage() {
  return (
    <main
      className=" bg-siteBg h-screen overflow-hidden relative bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/Lines-No-Background.png')",
      }}
    >
      <span className=" z-[2] absolute top-0 left-0 right-0 bottom-0  bg-siteBg opacity-95 "></span>
      <div className=" relative lg:container mx-auto py-5 xl:px-0 px-5 flex flex-col items-center z-10 ">
        <LandingPageHeader />
        <h1 className="text-center font-syne font-bold text-5xl mt-20 ">
          Easy Transactions <br /> and Investments
        </h1>
        <p className="font-dm_sans text-siteHeadingDark/60">
          Guaranteed revenue growth and seemless transactions
        </p>
        <div className="flex gap-5 mt-5 mb-8">
          <Button className="heroBtn bg-siteHeadingDark hover:bg-siteGreen font-medium text-white ">
            Start for free
          </Button>
          <Button className="heroBtn text-siteHeadingDark bg-transparent font-medium hover:text-siteGreen ">
            login
          </Button>
        </div>
      </div>
      <div className=" relative  z-10 lg:container mx-auto py-5 xl:px-0 px-5 w-full flex justify-center ">
        <Image
          className=" rounded-lg h-full  border-[8px] bg-gradient-to-r from-siteGreen  to-siteLemon border-transparent bg-cover bg-center"
          src="/hero-image.png"
          alt="hero"
          width={1000}
          height={500}
        />
      </div>
    </main>
  );
}

export default LandingPage;
