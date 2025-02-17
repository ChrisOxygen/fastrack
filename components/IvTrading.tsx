import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";

import { INVESTMENT_PLANS } from "@/constants";
import CountDownTimer from "./CountDownTimer";
import IvSim from "./IvSim";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSingleInvestmentBasedOnDuration } from "@/utils/actions/investment.actions";
import { useRouter } from "next/navigation";

import { useTimer } from "react-timer-hook";
import ActiveInvestmentCompleted from "./ActiveInvestmentCompleted";

type IvTradingProps = {
  investment: any;
  expiryTimestamp: Date;
  roi: number;
  packageDurationDays: number;
};

function IvTrading({
  investment,
  expiryTimestamp,
  roi,
  packageDurationDays,
}: IvTradingProps) {
  const [addedAmt, setAddedAmt] = useState(0);
  const [hasCompleted, setHasCompleted] = useState(false);

  const timer = useTimer({
    expiryTimestamp,
    onExpire: () => {
      console.log("timer expired");

      setHasCompleted(true);
    },
  });

  const {
    investmentPackage,
    amount,
    createdAt,
    status: ivStatus,
    returns,
  } = investment;

  const durationPercentage = useCallback(
    (createdAt: string, durationInDays: number) => {
      const durationInMs = durationInDays * 24 * 60 * 60 * 1000;
      console.log("createdAt", createdAt, "durationInDays", durationInDays);
      const sD = new Date(createdAt);
      console.log("sD", sD);
      const startDate = new Date(createdAt).getTime();
      console.log("startDate", startDate);
      const endDate = new Date(createdAt);
      endDate.setMilliseconds(durationInMs);
      console.log("endDate", new Date(endDate));
      const endDateInMs = endDate.getTime();
      console.log("endDate", endDateInMs);
      const currentDate = new Date().getTime();

      console.log("currentDate", new Date());

      const duration = endDateInMs - startDate;
      console.log("duration", duration);
      const remaining = endDateInMs - currentDate;
      console.log("remaining", remaining);
      if (remaining <= 0) {
        return 0;
      }
      const percentage = (remaining / duration) * 100;
      return percentage;
    },
    [],
  );

  useEffect(() => {
    const remainingTimePercentage = durationPercentage(
      createdAt,
      packageDurationDays,
    );
    const oneQuaterRoi = roi / 4;

    console.log(oneQuaterRoi);

    if (remainingTimePercentage <= 75 && remainingTimePercentage > 50) {
      setAddedAmt(oneQuaterRoi);
    } else if (remainingTimePercentage <= 50 && remainingTimePercentage > 25) {
      setAddedAmt(oneQuaterRoi * 2);
    } else if (remainingTimePercentage <= 25) {
      setAddedAmt(oneQuaterRoi * 3);
    }
  }, [createdAt, packageDurationDays, roi, durationPercentage]);

  console.log("timer", timer);

  const isRunning = ivStatus === "running";
  return (
    <>
      {hasCompleted ? (
        <ActiveInvestmentCompleted investmentId={investment._id as string} />
      ) : (
        <div className="mt-10 flex w-full flex-col items-center gap-2">
          <span className="py[3px] grid place-items-center border bg-gray-100 px-2 font-semibold uppercase text-gray-600">
            {investmentPackage}
          </span>
          <IvSim tradeAmount={amount + addedAmt} />
          <div className="flex flex-col items-center gap-2">
            <CountDownTimer
              isActive={isRunning}
              createdAt={createdAt}
              durationInDays={packageDurationDays}
            />
            <div
              className={clsx(
                "flex items-center gap-3 rounded-3xl border border-siteHeadingDark/25 px-3 py-1 text-sm uppercase",
                isRunning ? "opacity-100" : "opacity-50",
              )}
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
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default IvTrading;
