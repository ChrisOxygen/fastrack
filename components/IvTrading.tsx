import clsx from "clsx";
import React, { useCallback, useEffect, useState } from "react";

import { INVESTMENT_PLANS } from "@/constants";
import CountDownTimer from "./CountDownTimer";
import IvSim from "./IvSim";

//   {
//     "_id": "672b6f04de6393391ae9f72d",
//     "investmentPackage": "sapphire",
//     "amount": 400,
//     "status": "running",
//     "returns": 460,
//     "user": "66deb36559669ef523998f29",
//     "createdAt": "2024-11-06T13:28:36.353Z",
//     "updatedAt": "2024-11-06T13:28:36.353Z",
//     "__v": 0
// }

function IvTrading({ investment }: { investment: any }) {
  const [addedAmt, setAddedAmt] = useState(0);
  const {
    investmentPackage,
    amount,
    createdAt,
    status: ivStatus,
    returns,
  } = investment;

  const packageDurationDays = INVESTMENT_PLANS.find(
    (plan) =>
      plan.packageName.toLocaleLowerCase() ===
      investmentPackage.toLocaleLowerCase(),
  )!.durationDays;

  const roiP = INVESTMENT_PLANS.find(
    (plan) =>
      plan.packageName.toLocaleLowerCase() ===
      investmentPackage.toLocaleLowerCase(),
  )!.roiPercent;

  const roi = amount * (roiP / 100);

  //   const durationPecentage = (createdAt: string, durationInDays: number) => {
  //     const startDate = new Date(createdAt).getTime();
  //     const endDate = new Date(createdAt);
  //     endDate.setDate(endDate.getDate() + durationInDays);
  //     const endDateInMs = endDate.getTime();
  //     const currentDate = new Date().getTime();

  //     const duration = endDateInMs - startDate;
  //     const remaining = endDateInMs - currentDate;
  //     const percentage = (remaining / duration) * 100;
  //     return percentage;
  //   };

  const durationPercentage = useCallback(
    (createdAt: string, durationInDays: number) => {
      const startDate = new Date(createdAt).getTime();
      const endDate = new Date(createdAt);
      endDate.setDate(endDate.getDate() + durationInDays);
      const endDateInMs = endDate.getTime();
      const currentDate = new Date().getTime();

      const duration = endDateInMs - startDate;
      const remaining = endDateInMs - currentDate;
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

  console.log(
    "durationPecentage",
    durationPercentage(createdAt, packageDurationDays),
    "ROI",
    roi,
    amount,
    addedAmt,
  );

  const isRunning = ivStatus === "running";
  return (
    <>
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
    </>
  );
}

export default IvTrading;