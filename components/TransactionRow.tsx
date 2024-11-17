"use client";

import { TransactionType } from "@/app/dashboard/layout";
import { FiGift, FiPlus, FiTrendingUp } from "react-icons/fi";
import { GoArrowSwitch } from "react-icons/go";
import ViewTransDetails from "./ViewTransDetails";
import Link from "next/link";
import { useViewport } from "react-viewport-hooks";

type TransactionRowProps = {
  isLast: boolean;
  transaction: TransactionType;
  isFirst: boolean;
};

function getColorString(transactionType: string) {
  switch (transactionType) {
    case "investment deposit":
      return "text-siteGreen bg-siteGreen/15";
    case "investment payout":
      return "text-yellow-500  bg-yellow-500/15";
    case "deposit":
      return "text-siteGreen bg-siteGreen/15";
    case "transfer":
      return "text-red-700 bg-red-700/15";
    case "investment bonus":
      return "text-yellow-500  bg-yellow-500/15";
    case "referral bonus":
      return "text-yellow-500  bg-yellow-500/15";
    default:
      return "text-yellow-500  bg-yellow-500/15";
  }
}

function getIcon(transactionType: string) {
  switch (transactionType) {
    case "investment deposit":
      return <FiTrendingUp />;
    case "investment payout":
      return <FiTrendingUp />;
    case "deposit":
      return <FiPlus />;
    case "transfer":
      return <GoArrowSwitch />;
    case "investment bonus":
      return <FiGift />;
    case "referral bonus":
      return <FiGift />;
    default:
      return <FiTrendingUp />;
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "text-yellow-500  bg-yellow-500/15";
    case "success":
      return "text-siteGreen bg-siteGreen/15";
    case "error":
      return "text-red-700 bg-red-700/15";
    default:
      return "text-yellow-500  bg-yellow-500/15";
  }
}

function getStatusColorMobile(status: string) {
  switch (status) {
    case "pending":
      return "text-yellow-500";
    case "success":
      return "text-green-700";
    case "error":
      return "text-red-700";
    default:
      return "text-yellow-500";
  }
}

function TransactionRow({ isLast, transaction, isFirst }: TransactionRowProps) {
  const { type, amount, status, transactionId, fee, createdAt } = transaction;

  const { vw, vh } = useViewport();

  const isMobile = vw < 640;

  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {isMobile ? (
        <Link
          href={`/dashboard/transaction/${transactionId}`}
          className={`flex items-center justify-between border-b border-siteHeadingDark/20 py-3 ${
            !isLast && "border-b border-siteHeadingDark/20"
          } ${isFirst && "border-t border-siteHeadingDark/20"}`}
        >
          <div className="text-sm text-siteHeadingDark/60">
            <div className="flex items-center gap-3">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full ${getColorString(
                  type,
                )}`}
              >
                {getIcon(type)}
              </span>
              <div className="flex flex-col items-start">
                <span className="font-dm_sans text-xl font-bold capitalize text-siteHeadingDark">
                  {type}
                </span>
                <span className="font-dm_sans text-sm font-bold text-siteHeadingDark/35">
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end">
            <span className="justify-self-center font-dm_sans text-xl font-black capitalize text-siteHeadingDark">
              ${amount}
            </span>
            <div className="justify-self-center text-sm text-siteHeadingDark/60">
              <span
                className={`rounded font-bold capitalize ${getStatusColorMobile(
                  status,
                )}`}
              >
                {status}
              </span>
            </div>
          </div>
        </Link>
      ) : (
        <div
          className={`grid w-full grid-cols-[minmax(200px,300px)_minmax(70px,200px)_minmax(80px,200px)_minmax(110px,250px)_minmax(50px,140px)_minmax(70px,140px)] items-center justify-between gap-0 py-2 lg:grid-cols-[minmax(180px,300px)_minmax(70px,200px)_minmax(80px,200px)_minmax(0,250px)_minmax(0,140px)_minmax(70px,140px)] grid1364:grid-cols-[minmax(200px,300px)_minmax(70px,200px)_minmax(80px,200px)_minmax(110px,250px)_minmax(50px,140px)_minmax(70px,140px)] grid1364:gap-3 ${
            !isLast && "border-b border-siteHeadingDark/20"
          }`}
        >
          <div className="text-sm text-siteHeadingDark/60">
            <div className="flex items-center gap-3">
              <span
                className={`grid h-8 w-8 place-items-center rounded-full ${getColorString(
                  type,
                )}`}
              >
                {getIcon(type)}
              </span>
              <div className="flex flex-col items-start">
                <span className="font-dm_sans font-bold capitalize text-siteHeadingDark">
                  {type}
                </span>
                <span className="font-dm_sans text-sm font-bold text-siteHeadingDark/35">
                  {formattedDate}
                </span>
              </div>
            </div>
          </div>
          <span className="justify-self-center text-sm text-siteHeadingDark/60">
            ${amount}
          </span>
          <div className="justify-self-center text-sm text-siteHeadingDark/60">
            <span
              className={`rounded px-2 py-[1px] font-bold capitalize ${getStatusColor(
                status,
              )}`}
            >
              {status}
            </span>
          </div>
          <span className="block justify-self-center text-sm font-bold text-siteHeadingDark/70 lg:hidden grid1364:block">
            {transactionId}
          </span>
          <span className="block justify-self-center text-sm font-bold text-siteHeadingDark/60 lg:hidden grid1364:block">
            ${fee}
          </span>

          <span className="col-start-6 justify-self-center text-sm text-siteHeadingDark/60">
            <ViewTransDetails transactionId={transactionId} />
          </span>
        </div>
      )}
    </>
  );
}

export default TransactionRow;
