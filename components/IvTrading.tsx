import clsx from "clsx";
import React, { use, useCallback, useEffect, useState } from "react";

import { INVESTMENT_PLANS } from "@/constants";
import CountDownTimer from "./CountDownTimer";
import IvSim from "./IvSim";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSingleInvestmentBasedOnDuration } from "@/utils/actions/investment.actions";
import { useRouter } from "next/navigation";

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
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return updateSingleInvestmentBasedOnDuration(investment._id);
    },
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (data) => {
      console.log("data", data);

      queryClient.invalidateQueries({ queryKey: ["user", "investment"] });

      router.push(`/dashboard/investment/processing/${investment._id}`);
    },
  });
  const {
    investmentPackage,
    amount,
    createdAt,
    status: ivStatus,
    returns,
  } = investment;

  const createdAtDate = new Date(createdAt);
  console.log("createdAtDate FRom DB", createdAtDate);

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

  useEffect(() => {
    const createdMs = new Date(createdAt).getTime();
    const durationMs = packageDurationDays * 24 * 60 * 60 * 1000;
    const endDateMs = createdMs + durationMs;
    const remainingTimeMs = endDateMs - new Date().getTime();

    const countdown = setTimeout(() => {
      mutate();
    }, remainingTimeMs);

    return () => clearTimeout(countdown);
  }, [createdAt, mutate, packageDurationDays]);

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
            id={investment._id}
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
