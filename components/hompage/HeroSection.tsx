"use client";

import LandingPageHeader from "@/components/LandingPageHeader";
import CustomButton from "@/components/ui/CustomButton";
import { motion } from "framer-motion";

import Image from "next/image";
import Link from "next/link";
import { CgArrowRight } from "react-icons/cg";

function HeroSection() {
  return (
    <div
      className="grid h-full max-h-[900px] w-full grid-rows-[100px_400px_1fr] overflow-hidden bg-cover bg-fixed bg-center sm:h-screen sm:grid-rows-[100px_400px_1fr]"
      style={{
        backgroundImage: "url('/assets/hero-bg-1.svg')",
      }}
    >
      <span
        className="absolute left-0 top-[100px] z-0 h-full w-full bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: "url('/assets/hero-line-shape-1.svg')",
        }}
      ></span>
      <LandingPageHeader />
      <div className="relative row-span-1 row-start-2 flex h-full w-screen flex-col items-center justify-center gap-4 px-6 md:gap-7">
        <h2 className="max-w-[700px] text-center text-3xl font-bold md:text-6xl">
          Dollar investments
          <br /> that help you grow.
        </h2>
        <p className="w-full max-w-[900px] text-center text-xl text-siteText md:text-2xl">
          Rise gives you access to a carefully selected portfolio of global
          investments, across US stocks, US real estate and fixed income assets.
        </p>
        <div className="flex items-center gap-6">
          <CustomButton
            href="/signup"
            text="Sign up for Free"
            iconPosition="right"
            bgColor="orange"
            hoverBgColor="green"
            textColor="black"
            icon={<CgArrowRight />}
          />
          <CustomButton
            href="/login"
            text="Login"
            iconPosition="right"
            bgColor="white"
            hoverBgColor="green"
            textColor="black"
            icon={<CgArrowRight />}
          />
        </div>
      </div>
      <motion.div
        initial={{
          opacity: 0, // Start invisible
          y: "60%", // Slide in from the bottom
        }}
        whileInView={{
          opacity: 1, // Fade in to 100% visible
          y: 0, // Slide in to its original position
          transition: {
            duration: 1,
            type: "spring",
            bounce: 0.5,
          },
        }}
        viewport={{ once: true }}
        className="relative row-span-1 row-start-3 hidden w-full place-content-center px-6 sm:grid lg:px-0"
      >
        <Image
          className="rounded-2xl border-[4px]"
          src="/assets/hero-img.webp"
          alt="hero"
          width={1024}
          height={590}
        />
      </motion.div>
    </div>
  );
}

export default HeroSection;
