import {
  formatToUSD,
  getReadableDuration,
  randomBetween,
  roiZone,
} from "@/utils/services";
import React, { useEffect, useState } from "react";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";

import { Investment } from "@/app/dashboard/investment/[id]/page";

import clsx from "clsx";
import { set } from "mongoose";

type IvSimulatorProps = {
  investment: Investment;
  roi: number;
  packageDurationDays: number;
};

function IvSimulator({
  investment,

  roi,
  packageDurationDays,
}: IvSimulatorProps) {
  const [instatntRoi, setInstatntRoi] = useState(0.02);
  const [endsInText, setEndsInText] = useState("N/A");

  const [netProfit, setNetProfit] = useState<null | number>(() => {
    const currentTime = new Date();
    const durationSecs = packageDurationDays * 24 * 60 * 60;
    const totalAddedAmount = investment.returns - investment.amount;
    const createdTime = new Date(investment.createdAt);
    const endTime = new Date(
      createdTime.setSeconds(createdTime.getSeconds() + durationSecs),
    );

    const remainingDurationSecs =
      (endTime.getTime() - currentTime.getTime()) / 1000;

    const remainingDurationPercentage =
      (remainingDurationSecs / durationSecs) * 100;
    const addAmountPecent = 100 - remainingDurationPercentage;
    const addAmount = (totalAddedAmount * addAmountPecent) / 100;

    return +addAmount.toFixed(2);
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date();
      const durationSecs = packageDurationDays * 24 * 60 * 60;
      const totalAddedAmount = investment.returns - investment.amount;
      const createdTime = new Date(investment.createdAt);
      const endTime = new Date(
        createdTime.setSeconds(createdTime.getSeconds() + durationSecs),
      );

      const remainingDurationSecs =
        (endTime.getTime() - currentTime.getTime()) / 1000;

      const remainingDurationPercentage =
        (remainingDurationSecs / durationSecs) * 100;
      const addAmountPecent = 100 - remainingDurationPercentage;
      const addAmount = (totalAddedAmount * addAmountPecent) / 100;
      const randomRoi = randomBetween(+addAmount - 4, addAmount + 4);

      setNetProfit((prev) => {
        const newAmount = +randomRoi.toFixed(2);
        const diff =
          newAmount +
          investment.amount -
          ((prev as number) + investment.amount);
        const diffPercentage =
          (diff / ((prev as number) + investment.amount)) * 100;
        console.log("diffPercentage", diffPercentage);
        setInstatntRoi(+diffPercentage.toFixed(2));
        return newAmount;
      });
      setEndsInText(() => getReadableDuration(endTime));
    }, 5000);

    return () => clearInterval(interval);
  }, [
    investment.amount,
    investment.createdAt,
    investment.returns,
    packageDurationDays,
  ]);

  const { investmentPackage, amount, createdAt, status, returns } = investment;

  //   if (ivStatus === "pending") {
  //     return <Skeleton className="h-[80px] w-full" />;
  //   }

  const isPositiveRoi = instatntRoi >= 0;

  return (
    <div className="w-full">
      <div className="hidden flex-col px-4 md:flex">
        <div className="grid grid-cols-[minmax(max-content,1fr)_minmax(80px,150px)_minmax(80px,150px)_minmax(80px,150px)_minmax(150px,190px)] border-b py-2">
          <span className="text-sm font-semibold uppercase text-siteText">
            Package
          </span>
          <span className="text-sm font-semibold uppercase text-siteText">
            COI
          </span>
          <span className="justify-self-center text-sm font-semibold uppercase text-siteText">
            ROI(%)
          </span>
          <span className="justify-self-center text-sm font-semibold uppercase text-siteText">
            Net Profit
          </span>
          <span className="justify-self-end text-sm font-semibold uppercase text-siteText">
            Ends in:
          </span>
        </div>
        <div className="grid grid-cols-[minmax(max-content,1fr)_minmax(80px,150px)_minmax(80px,150px)_minmax(80px,150px)_minmax(150px,190px)] py-2">
          <span className="font-semibold capitalize text-slate-900">
            {investmentPackage}
          </span>
          <span className="font-semibold uppercase text-slate-900">
            {formatToUSD(amount)}
          </span>
          <div className="-ml-2 flex items-center gap-1 justify-self-center font-semibold uppercase text-slate-900">
            <span
              className={clsx(
                "",
                isPositiveRoi ? "text-green-600" : "text-red-700",
              )}
            >
              {isPositiveRoi ? <BsArrowUpShort /> : <BsArrowDownShort />}
            </span>
            <span
              className={clsx(
                "",
                isPositiveRoi ? "text-green-600" : "text-red-700",
              )}
            >
              {Math.abs(instatntRoi)}%
            </span>
          </div>
          <span className="justify-self-center font-semibold uppercase text-slate-900">
            {formatToUSD(amount + (netProfit as number))}
          </span>
          <span className="justify-self-end font-semibold capitalize text-slate-900">
            {endsInText}
          </span>
        </div>
      </div>
      <div className="flex flex-col border p-3 md:hidden">
        <div className="flex items-center justify-between border-b border-dotted py-2">
          <span className="capitalize text-siteText">Investment Package</span>
          <span className="text-sm font-semibold uppercase">
            {investmentPackage}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-dotted py-2">
          <span className="capitalize text-siteText">Cost of Investment</span>
          <span className="text-sm font-semibold uppercase">
            {formatToUSD(amount)}
          </span>
        </div>
        <div className="flex items-center justify-between border-b border-dotted py-2">
          <span className="capitalize text-siteText">Roi(%)</span>
          <div className="flex items-center gap-1 text-sm font-semibold uppercase">
            <span
              className={clsx(
                "",
                isPositiveRoi ? "text-green-600" : "text-red-700",
              )}
            >
              {isPositiveRoi ? <BsArrowUpShort /> : <BsArrowDownShort />}
            </span>
            <span
              className={clsx(
                "",
                isPositiveRoi ? "text-green-600" : "text-red-700",
              )}
            >
              {Math.abs(instatntRoi)}%
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between border-b border-dotted py-2">
          <span className="capitalize text-siteText">Net Profit</span>
          <span className="text-sm font-semibold uppercase">
            {formatToUSD(amount + (netProfit as number))}
          </span>
        </div>
        <div className="flex items-center justify-between py-2">
          <span className="capitalize text-siteText">Ends in:</span>
          <span className="Capitalize text-sm font-semibold">{endsInText}</span>
        </div>
      </div>
    </div>
  );
}

export default IvSimulator;
