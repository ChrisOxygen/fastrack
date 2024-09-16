"use client";

import { useRouter } from "next/navigation";
import { FiX } from "react-icons/fi";

function StepDisplay({ step }: { step: number }) {
  const router = useRouter();
  return (
    <div
      className="relative z-[-1] hidden h-28 grid-cols-[50px_1fr_50px] items-center justify-between rounded-2xl bg-siteGreen bg-cover bg-left bg-no-repeat px-7 py-6 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-2xl before:bg-siteGreen/50 sm:grid"
      style={{
        backgroundImage: "url('/Lines-No-Background-white.png')",
      }}
    >
      <div className="relative z-10 col-span-1 col-start-2 flex justify-center gap-2">
        <div className="flex flex-col items-center gap-1">
          <span className="h-3 w-3 rounded-full border-4 border-siteLemon"></span>
          <span className="font-dm_sans font-bold text-white">Step 1</span>
        </div>
        <span
          className={`mt-1 h-1 w-[100px] rounded-lg ${
            step >= 2 && "bg-siteLemon"
          } ${step === 1 && "bg-white"}`}
        ></span>
        <div className="flex flex-col items-center gap-1">
          <span
            className={`h-3 w-3 rounded-full border-4 ${
              step >= 2 && "border-siteLemon"
            } ${step === 1 && "border-white"}`}
          ></span>
          <span className="font-dm_sans font-bold text-white">Step 2</span>
        </div>
        <span
          className={`mt-1 h-1 w-[100px] rounded-lg ${
            step >= 3 && "bg-siteLemon"
          } ${step <= 2 && "bg-white"}`}
        ></span>
        <div className="flex flex-col items-center gap-1">
          <span
            className={`h-3 w-3 rounded-full border-4 ${
              step >= 3 && "border-siteLemon"
            } ${step <= 2 && "border-white"}`}
          ></span>
          <span className="font-dm_sans font-bold text-white">Step 3</span>
        </div>
      </div>
      <button
        className="z-10 grid h-6 w-6 place-items-center rounded-lg bg-white text-2xl shadow"
        onClick={() => {
          router.push("/dashboard");
        }}
      >
        <FiX />
      </button>
    </div>
  );
}

export default StepDisplay;
