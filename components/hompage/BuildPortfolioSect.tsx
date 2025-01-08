"use client";
import CustomButton from "../ui/CustomButton";
import { CgArrowRight } from "react-icons/cg";

import { motion } from "framer-motion";
import Image from "next/image";

function BuildPortfolioSect() {
  return (
    <div className="relative grid w-full place-items-center py-[100px]">
      <div className="mx-auto flex w-full flex-col items-center justify-between gap-20 px-6 md:container lg:flex-row">
        <motion.div
          initial={{
            opacity: 0, // Start invisible
            x: "-60%", // Slide in from the bottom
          }}
          whileInView={{
            opacity: 1, // Fade in to 100% visible
            x: 0, // Slide in to its original position
            transition: {
              duration: 1,
              type: "spring",
              bounce: 0.5,
            },
          }}
          viewport={{ once: true }}
          className="grid w-full place-items-center"
        >
          <Image
            className=""
            src="/assets/fastrack-img-1.webp"
            alt="Fastrack"
            width={619}
            height={619}
          />
        </motion.div>
        <motion.div
          initial={{
            opacity: 0, // Start invisible
            x: "60%", // Slide in from the bottom
          }}
          whileInView={{
            opacity: 1, // Fade in to 100% visible
            x: 0, // Slide in to its original position
            transition: {
              duration: 1,
              type: "spring",
              bounce: 0.5,
              staggerChildren: 0.5,
            },
          }}
          viewport={{ once: true }}
          className="flex w-full max-w-[600px] flex-col items-center gap-6 lg:items-start"
        >
          <motion.span
            initial={{
              opacity: 0, // Start invisible
              x: "60%", // Slide in from the bottom
            }}
            whileInView={{
              opacity: 1, // Fade in to 100% visible
              x: 0, // Slide in to its original position
              transition: {
                duration: 1,
                type: "spring",
                bounce: 0.5,
                staggerChildren: 0.5,
              },
            }}
            viewport={{ once: true }}
            className="w-max rounded bg-siteGreen/5 px-4 py-1 font-semibold uppercase text-siteGreen"
          >
            Investing
          </motion.span>
          <motion.h2
            initial={{
              opacity: 0, // Start invisible
              x: "60%", // Slide in from the bottom
            }}
            whileInView={{
              opacity: 1, // Fade in to 100% visible
              x: 0, // Slide in to its original position
              transition: {
                duration: 1,
                type: "spring",
                bounce: 0.5,
                staggerChildren: 0.5,
              },
            }}
            viewport={{ once: true }}
            className="max-w-[700px] text-center text-3xl font-bold md:text-5xl lg:text-left"
          >
            Build your portfolio starting with just $1
          </motion.h2>
          <motion.p
            initial={{
              opacity: 0, // Start invisible
              x: "60%", // Slide in from the bottom
            }}
            whileInView={{
              opacity: 1, // Fade in to 100% visible
              x: 0, // Slide in to its original position
              transition: {
                duration: 1,
                type: "spring",
                bounce: 0.5,
                staggerChildren: 0.5,
              },
            }}
            viewport={{ once: true }}
            className="w-full max-w-[900px] text-center text-xl text-siteText md:text-2xl lg:text-left"
          >
            Invest in stocks, ETFs, and their options, at your pace and
            commission-free.
          </motion.p>
          <CustomButton
            href="/signup"
            text="Sign up for Free"
            iconPosition="right"
            bgColor="orange"
            hoverBgColor="green"
            textColor="black"
            icon={<CgArrowRight />}
          />
        </motion.div>
      </div>
    </div>
  );
}

export default BuildPortfolioSect;
