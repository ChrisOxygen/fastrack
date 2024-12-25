"use client";

import { motion } from "framer-motion";
import clsx from "clsx";
import Link from "next/link";

type CustomButtonProps = {
  text: string;
  href?: string;
  onClickFn?: () => void;
  icon?: React.ReactNode;
  bgColor: "green" | "orange" | "white";
  hoverBgColor: "green" | "orange" | "white";
  textColor: "white" | "black";
  iconPosition?: "left" | "right";
};

function CustomButton({
  text,
  href,
  icon,
  bgColor,
  hoverBgColor,
  textColor,
  iconPosition,
  onClickFn,
}: CustomButtonProps) {
  const childBgVariants = {
    hidden: {
      y: "-100%",
    },
    visible: {
      y: "-50%",
      transition: {
        duration: 1.5,
        type: "spring",
        bounce: 0.8,
      },
    },
  };
  const backgroundColor =
    bgColor === "green"
      ? "bg-siteGreen"
      : bgColor === "orange"
        ? "bg-siteOrange"
        : "bg-white";

  const hoverBackgroundColor =
    hoverBgColor === "green"
      ? "bg-siteGreen"
      : hoverBgColor === "orange"
        ? "bg-siteOrange"
        : "bg-white";
  return (
    <motion.div
      className={clsx(
        "relative h-[48px] w-max overflow-hidden rounded-[8px] sm:h-[58px]",
        backgroundColor,
      )}
      initial="hidden"
      animate="hidden"
      whileHover="visible"
    >
      <span
        className={clsx(
          "absolute z-[2px] h-full w-full rounded-[8px] bg-transparent",
          bgColor === "white" && "border",
        )}
      ></span>
      <motion.span
        variants={childBgVariants}
        className={clsx(
          "absolute z-[4px] h-[97px] w-full -translate-y-full sm:h-[117px]",
          hoverBackgroundColor,
        )}
      ></motion.span>

      {href ? (
        <Link
          href={href}
          className={clsx(
            "relative z-[2] inline-flex h-full w-max items-center justify-center px-[22px] py-3 text-center text-[16px] font-bold leading-[1] transition-all ease-in-out hover:scale-[112%] hover:text-black sm:px-[26px] sm:py-4",
            textColor === "white" && "text-white hover:text-black",
            textColor === "black" && "text-black hover:text-white",
          )}
        >
          <div
            className={clsx(
              "flex items-center gap-2 font-archivo font-bold",
              !iconPosition && "flex-row",
              iconPosition === "left" ? "flex-row-reverse" : "flex-row",
            )}
          >
            <span className="font-bold tracking-[-.5px]">{text}</span>
            <span className="text-[18px]">{icon && icon}</span>
          </div>
        </Link>
      ) : (
        <button
          className={clsx(
            "relative z-[2] inline-flex h-full w-max items-center justify-center px-[26px] py-4 text-center text-[16px] font-bold leading-[1] transition-all ease-in-out hover:scale-[112%] hover:text-black",
            textColor === "white" && "text-white hover:text-black",
            textColor === "black" && "text-black hover:text-white",
          )}
          onClick={() => onClickFn && onClickFn()}
        >
          <div
            className={clsx(
              "flex items-center gap-2 font-archivo font-bold",
              !iconPosition && "flex-row",
              iconPosition === "left" ? "flex-row-reverse" : "flex-row",
            )}
          >
            <span className="font-bold tracking-[-.5px]">{text}</span>
            <span className="text-[18px]">{icon && icon}</span>
          </div>
        </button>
      )}
    </motion.div>
  );
}

export default CustomButton;
