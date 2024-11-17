import { INVESTMENT_PLANS } from "@/constants";
import { formatToUSD } from "@/utils/services";
import clsx from "clsx";
import { stat } from "fs";
import Link from "next/link";

import { useViewport } from "react-viewport-hooks";

type InvestmentRowProps = {
  investment: {
    investmentPackage: string;
    amount: number;
    status: string;
    returns: number;
    createdAt: string;
    _id: string;
  };
  num: number;
};

const getDurationDays = (packageName: string) => {
  return INVESTMENT_PLANS.find(
    (plan) => plan.packageName.toLocaleLowerCase() === packageName,
  )!.durationDays;
};

const endDate = (createdAt: string, duration: number) => {
  const date = new Date(createdAt);
  date.setDate(date.getDate() + duration);
  //   return date.toDateString();
  // return dat without year
  return date.toDateString().slice(0, -5);
};

function InvestmentRow({ investment, num }: InvestmentRowProps) {
  const { amount, investmentPackage, status, createdAt, _id } = investment;

  const { vw, vh } = useViewport();

  const isMobile = vw < 700;

  const packageDurationDays = getDurationDays(investmentPackage);

  const roiP = INVESTMENT_PLANS.find(
    (plan) => plan.packageName.toLocaleLowerCase() === investmentPackage,
  )!.roiPercent;

  const ivLink =
    status === "running"
      ? `/dashboard/investment/${_id}`
      : status === "completed"
        ? `/dashboard/investment/completed/${_id}`
        : `/dashboard/investment/processing/${_id}`;

  if (isMobile) {
    return (
      <Link
        href={ivLink}
        className="flex w-full flex-col gap-2 rounded-xl border px-2 py-3"
      >
        <div className="flex items-center justify-between border-b py-2">
          <span className="text-xs font-semibold uppercase text-siteHeadingDark">
            Package
          </span>
          <span className="text-xs font-bold uppercase text-siteHeadingDark/70">
            {investmentPackage}
          </span>
        </div>
        <div className="flex items-center justify-between border-b py-2">
          <span className="text-xs font-semibold uppercase text-siteHeadingDark">
            Amount
          </span>
          <span className="justify-self-center text-xs font-semibold text-green-600">
            {formatToUSD(amount)}
          </span>
        </div>
        <div className="flex items-center justify-between border-b py-2">
          <span className="text-xs font-semibold uppercase text-siteHeadingDark">
            ROI(%)
          </span>
          <span className="justify-self-center text-xs font-semibold text-siteHeadingDark/60">
            Up to {roiP}%
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span
            className={clsx(
              "grid place-items-center justify-self-center rounded-xl border px-2 py-[2px] text-xs uppercase",
              status === "running" &&
                "border-orange-200 bg-orange-100 text-orange-500",
              status === "completed" &&
                "border-green-200 bg-green-100 text-green-500",
              status === "pending" &&
                "border-gray-200 bg-gray-100 text-gray-500",
            )}
          >
            {investment.status}
          </span>
          <span className="justify-self-center text-sm text-siteHeadingDark/60">
            {endDate(createdAt, packageDurationDays)}
          </span>
        </div>
      </Link>
    );
  }

  return (
    <Link href={ivLink} className="border-b last:border-none even:bg-slate-50">
      <div className="grid grid-cols-[25px_minmax(40px,100px)_minmax(80px,120px)_minmax(80px,120px)_minmax(60px,80px)_minmax(70px,90px)] items-center justify-between p-2">
        <span className="text-sm text-siteHeadingDark/60">#{num}</span>
        <span className="text-xs font-bold uppercase text-siteHeadingDark/70">
          {investmentPackage}
        </span>
        <span className="justify-self-center text-xs font-semibold text-green-600">
          {formatToUSD(amount)}
        </span>
        <span className="justify-self-center text-xs font-semibold text-siteHeadingDark/60">
          Up to {roiP}%
        </span>
        <span
          className={clsx(
            "grid place-items-center justify-self-center rounded-xl border px-2 py-[2px] text-xs uppercase",
            status === "running" &&
              "border-orange-200 bg-orange-100 text-orange-500",
            status === "completed" &&
              "border-green-200 bg-green-100 text-green-500",
            status === "pending" && "border-gray-200 bg-gray-100 text-gray-500",
          )}
        >
          {investment.status}
        </span>
        <span className="justify-self-center text-sm text-siteHeadingDark/60">
          {endDate(createdAt, packageDurationDays)}
        </span>
      </div>
    </Link>
  );
}

export default InvestmentRow;
