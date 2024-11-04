import clsx from "clsx";
import React, { useState } from "react";
import InvestmentRow from "./InvestmentRow";

function InvestmentsDisplay({ investments }: { investments: any }) {
  const [filters, setFilters] = useState({
    isRunning: false,
    isCompleted: false,
  });

  const { isRunning, isCompleted } = filters;

  const toggleFilter = (filter: string) => {
    if (filter === "isRunning") {
      setFilters((prev) => ({ ...prev, isRunning: !prev.isRunning }));
    }
    if (filter === "isCompleted") {
      setFilters((prev) => ({ ...prev, isCompleted: !prev.isCompleted }));
    }
  };

  console.log("filters", filters);

  return (
    <div className="">
      <div className="flex w-full flex-col gap-4 p-5">
        <div className="flex items-center justify-between">
          <h3 className="font-dm_sans font-bold uppercase text-siteHeadingDark">
            Active Investments
          </h3>
          <div className="flex items-center gap-3">
            <h3 className="font-dm_sans uppercase text-siteHeadingDark/70">
              Filters:
            </h3>
            <button
              className={clsx(
                "flex items-center gap-3 rounded-3xl border border-siteHeadingDark/25 px-3 py-1 text-sm uppercase",
                isRunning ? "opacity-100" : "opacity-50",
              )}
              onClick={() => toggleFilter("isRunning")}
            >
              <span
                className={clsx(
                  "block size-2 rounded-full",
                  isRunning ? "bg-orange-500" : "bg-gray-500",
                )}
              ></span>
              <span className={` ${isRunning ? "opacity-100" : "opacity-50"}`}>
                Running
              </span>
            </button>
            <button
              className={clsx(
                "flex items-center gap-3 rounded-3xl border border-siteHeadingDark/25 px-3 py-1 text-sm uppercase",
                isCompleted ? "opacity-100" : "opacity-50",
              )}
              onClick={() => toggleFilter("isCompleted")}
            >
              <span
                className={clsx(
                  "block size-2 rounded-full",
                  isCompleted ? "bg-green-500" : "bg-gray-500",
                )}
              ></span>
              <span
                className={` ${isCompleted ? "opacity-100" : "opacity-50"}`}
              >
                completed
              </span>
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <div className="grid grid-cols-[25px_minmax(40px,100px)_minmax(40px,60px)_minmax(30px,50px)_minmax(60px,80px)_minmax(70px,90px)] justify-between">
            <span className="text-sm uppercase text-siteHeadingDark/60">
              No.
            </span>
            <span className="text-sm uppercase text-siteHeadingDark/60">
              Tier
            </span>
            <span className="text-sm uppercase text-siteHeadingDark/60">
              Amount
            </span>
            <span className="text-sm uppercase text-siteHeadingDark/60">
              ROI(%)
            </span>
            <span className="text-sm uppercase text-siteHeadingDark/60">
              Status
            </span>
            <span className="text-sm uppercase text-siteHeadingDark/60">
              End Date
            </span>
          </div>
          <div className="flex flex-col">
            {investments.map((investment: any, index: number) => (
              <InvestmentRow
                key={index}
                investment={investment}
                num={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="">Invest</div>
      <div className="">Invest</div>
    </div>
  );
}

export default InvestmentsDisplay;
