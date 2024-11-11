import clsx from "clsx";
import React, { useState } from "react";
import InvestmentRow from "./InvestmentRow";
import IvFilters from "./IvFilters";

function InvestmentsDisplay({ investments }: { investments: any }) {
  const [filters, setFilters] = useState({
    isRunning: false,
    isCompleted: false,
    isProcessing: false,
  });

  const { isRunning, isCompleted, isProcessing } = filters;

  const filteredInvestments = investments.filter((investment: any) => {
    if (isRunning && investment.status === "running") return true;
    if (isCompleted && investment.status === "completed") return true;
    if (isProcessing && investment.status === "processing") return true;
    return false;
  });

  const filterActive = isRunning || isCompleted || isProcessing;

  const investmentsToDisplay = filterActive ? filteredInvestments : investments;

  return (
    <div className="">
      <div className="flex w-full flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <h3 className="font-dm_sans font-bold uppercase text-siteHeadingDark">
            Active Investments
          </h3>
          <IvFilters filters={filters} setFilters={setFilters} />
        </div>
        <div className="flex flex-col gap-1 overflow-hidden rounded-xl border">
          <div className="grid grid-cols-[25px_minmax(40px,100px)_minmax(80px,120px)_minmax(80px,120px)_minmax(60px,80px)_minmax(70px,90px)] items-center justify-between bg-slate-100 px-2 py-[5px]">
            <span className="text-xs uppercase text-siteHeadingDark/60">
              No.
            </span>
            <span className="text-xs font-semibold uppercase text-siteHeadingDark">
              Package
            </span>
            <span className="justify-self-center text-xs font-semibold uppercase text-siteHeadingDark">
              Amount
            </span>
            <span className="justify-self-center text-xs font-semibold uppercase text-siteHeadingDark">
              ROI(%)
            </span>
            <span className="justify-self-center text-xs font-semibold uppercase text-siteHeadingDark">
              Status
            </span>
            <span className="justify-self-center text-xs font-semibold uppercase text-siteHeadingDark">
              End Date
            </span>
          </div>
          <div className="flex flex-col">
            {investmentsToDisplay.map((investment: any, index: number) => (
              <InvestmentRow
                key={index}
                investment={investment}
                num={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestmentsDisplay;
