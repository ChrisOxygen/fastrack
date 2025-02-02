import clsx from "clsx";

import {
  BiSolidCheckCircle,
  BiSolidError,
  BiSolidErrorCircle,
  BiSolidInfoCircle,
} from "react-icons/bi";

import { FiX } from "react-icons/fi";

type ToastBoxProps = {
  variant: "success" | "error" | "warning" | "info";
  title?: string;
  message: string;
  handleClose: () => never | void;
};

function ToastBox({ variant, title, message, handleClose }: ToastBoxProps) {
  let variantProp = {
    title: title || "Some Information",
    mainColor: "blue",
    icon: <BiSolidInfoCircle />,
  };
  switch (variant) {
    case "success":
      variantProp = {
        title: title || "Success Message",
        mainColor: "green",
        icon: <BiSolidCheckCircle />,
      };
      break;
    case "error":
      variantProp = {
        title: title || "Error Message",
        mainColor: "red",
        icon: <BiSolidError />,
      };
      break;
    case "warning":
      variantProp = {
        title: title || "Warning Message",
        mainColor: "yellow",
        icon: <BiSolidErrorCircle />,
      };
      break;
    case "info":
      variantProp = {
        title: title || "Information Message",
        mainColor: "blue",
        icon: <BiSolidInfoCircle />,
      };
      break;
    default:
      break;
  }

  return (
    <div className="inset-shadow-sm relative overflow-hidden rounded-xl border-[2px] border-[#fff] to-[#fff] shadow shadow-[#fff]">
      <span
        className={clsx(
          "absolute z-[1] block h-full w-full bg-gradient-to-b",
          variantProp.mainColor === "green" && "from-green-500/20 to-white",
          variantProp.mainColor === "yellow" && "from-yellow-500/20 to-white",
          variantProp.mainColor === "blue" && "from-blue-500/20 to-white",
          variantProp.mainColor === "red" && "from-red-500/20 to-white",
        )}
      ></span>
      <div className="relative z-10 grid grid-cols-[32px_1fr_28px] items-start gap-3 p-5">
        <span
          className={clsx(
            "grid size-8 place-items-center justify-center rounded-full bg-black/30 shadow-lg",
            variantProp.mainColor === "green" &&
              "text-green-500 shadow-green-600/20",
            variantProp.mainColor === "yellow" &&
              "text-yellow-500 shadow-yellow-600/20",
            variantProp.mainColor === "blue" &&
              "text-blue-500 shadow-blue-600/20",
            variantProp.mainColor === "red" && "text-red-500 shadow-red-600/20",
          )}
        >
          {variantProp.icon}
        </span>
        <div className="">
          <h4
            className={clsx(
              "text-lg font-semibold capitalize",
              variantProp.mainColor === "green" && "text-green-500",
              variantProp.mainColor === "yellow" && "text-yellow-500",
              variantProp.mainColor === "blue" && "text-blue-500",
              variantProp.mainColor === "red" && "text-red-500",
            )}
          >
            {variantProp.title}
          </h4>
          <p className="text-sm text-white/90">{message}</p>
        </div>
        <button className="" onClick={handleClose}>
          <span className="grid place-items-center">
            <FiX />
          </span>
        </button>
      </div>
    </div>
  );
}

export default ToastBox;
