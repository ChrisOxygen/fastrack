"use client";

import useFetchUserData from "@/hooks/useFetchUserData";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { UserData } from "../../layout";
import { BiCheckCircle, BiCopy } from "react-icons/bi";
import Link from "next/link";
import copy from "copy-to-clipboard";
import { notify } from "@/components/ReferEarnBox";
import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "@/utils/actions/transaction.actions";
import LoadingSpinner from "@/components/LoadingSpinner";

function getTransactionTitle(type: string) {
  switch (type) {
    case "investment deposit":
      return "Investment deposit";
    case "investment payout":
      return "Investment payout";
    case "deposit":
      return "Deposit";
    case "transfer":
      return "Funds Transfer";
    case "investment bonus":
      return "Investment Bonus";
    case "referral bonus":
      return "Referral Bonus";
    default:
      return "Investment";
  }
}

function getSatusText(status: string) {
  switch (status) {
    case "pending":
      return "Pending";
    case "success":
      return "Successful";
    case "error":
      return "Failed";
    default:
      return "Pending";
  }
}

function getStatusColor(status: string) {
  switch (status) {
    case "pending":
      return "yellow-500";
    case "success":
      return "green-600";
    case "error":
      return "red-700";
    default:
      return "yellow-500";
  }
}

function Transaction() {
  const router = useRouter();

  const { transactionId } = useParams();

  const {
    data: transaction,
    error,
    status,
  } = useQuery({
    queryKey: ["transaction"],
    queryFn: () => {
      return getTransaction({ transId: transactionId as string });
    },
  });

  if (status === "pending") {
    return <LoadingSpinner />;
  }

  if (error) {
    console.log("error", error);
  }

  if (!transaction) {
    router.push("/dashboard");
  }

  const {
    amount,
    status: transactionStatus,
    createdAt,
    type,
    fee,
    updatedAt,
    transactionId: id,
  } = transaction!;

  const isAutomaticSuccess =
    createdAt === updatedAt && transactionStatus === "success";

  const isSuccessful = transactionStatus === "success";

  const isFailed = transactionStatus === "error";

  const transRow = isAutomaticSuccess || isSuccessful || isFailed ? 2 : 1;

  //   const transactedAt = new Date(createdAt).toLocaleDateString();

  const timeLineArray = Array.from({ length: transRow }, (_, i) => {
    return {
      title:
        i === 0
          ? `${getTransactionTitle(type)} Initiated`
          : `${getTransactionTitle(type)} ${getSatusText(transactionStatus)}`,
      date:
        i === 0
          ? new Date(createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : new Date(updatedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            }),
    };
  });

  function handleCopy() {
    copy(id);
    notify("Transaction ID copied to clipboard");
  }

  return (
    <section className="mx-auto mt-10 flex w-full max-w-[800px] flex-col items-center gap-10">
      <div className="flex flex-col items-center gap-6">
        <h3 className="font-dm_sans text-xl font-semibold text-siteHeadingDark">
          Amount
        </h3>
        <span className="font-dm_sans text-6xl font-bold">${amount}</span>
        <div className="flex items-center gap-3 rounded-full border border-siteHeadingDark/25 px-3 py-1">
          <span
            className={`block h-2 w-2 rounded-full bg-${getStatusColor(transactionStatus)}`}
          ></span>
          <span className="font-dm_sans font-bold capitalize text-siteHeadingDark">
            {transactionStatus}
          </span>
        </div>
      </div>
      <div className="flex w-full max-w-[500px] flex-col rounded-2xl border border-siteHeadingDark/25 p-[55px]">
        {timeLineArray.map((timeLine, index) => (
          <div
            key={index}
            className="relative flex w-full flex-col border-b border-siteHeadingDark/25 py-4 last:border-b-0"
          >
            <span
              className={`absolute left-[-35px] grid place-items-center text-xl text-${getStatusColor(transactionStatus)} content-[''] after:top-0 after:mt-2 ${index === 1 ? "after:hidden" : "after:block"} after:h-[50px] after:w-[2px] after:bg-${getStatusColor(transactionStatus)}`}
            >
              <BiCheckCircle />
            </span>
            <p className="font-dm_sans text-lg font-bold capitalize text-siteHeadingDark">
              {timeLine.title}
            </p>
            <span className="font-dm_sans text-siteHeadingDark/50">
              {timeLine.date}
            </span>
          </div>
        ))}
      </div>
      <div className="gap4 flex w-full max-w-[500px] flex-col">
        <p className="font-dm_sans text-xl font-bold text-siteHeadingDark">
          Transaction Details
        </p>
        <div className="flex w-full flex-col">
          <div className="flex items-center justify-between border-b-2 border-dashed border-siteHeadingDark/25 py-3 font-dm_sans">
            <span className="text-lg font-semibold text-siteHeadingDark/70">
              Transaction ID
            </span>
            <div className="flex items-center gap-2 text-lg font-black text-black">
              <span className="">{id}</span>
              <button
                className="text-2xl text-green-600"
                onClick={() => handleCopy()}
              >
                <BiCopy />
              </button>
            </div>
          </div>
          <div className="flex items-center justify-between border-b-2 border-dashed border-siteHeadingDark/25 py-3 font-dm_sans">
            <span className="text-lg font-semibold text-siteHeadingDark/70">
              Transaction ID
            </span>
            <div className="flex items-center gap-2 text-lg font-black text-black">
              <span className="">{id}</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-b-2 border-dashed border-siteHeadingDark/25 py-3 font-dm_sans">
            <span className="text-lg font-semibold text-siteHeadingDark/70">
              {type} Amount
            </span>
            <div className="flex items-center gap-2 text-lg font-black text-black">
              <span className="">${amount}</span>
            </div>
          </div>
          <div className="flex items-center justify-between border-b-2 border-dashed border-siteHeadingDark/25 py-3 font-dm_sans">
            <span className="text-lg font-semibold text-siteHeadingDark/70">
              Fees
            </span>
            <div className="flex items-center gap-2 text-lg font-black text-black">
              <span className="">${fee}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full max-w-[500px] flex-col gap-4 sm:flex-row">
        <Link
          href="/dashboard"
          className="grid w-full place-items-center rounded-xl bg-siteGreen px-6 py-3 font-dm_sans text-lg font-bold text-white"
        >
          Dashboard
        </Link>
        <Link
          href="/dashboard/support"
          className="grid w-full place-items-center rounded-xl bg-siteLemon px-6 py-3 font-dm_sans text-lg font-bold text-siteHeadingDark"
        >
          Contact support
        </Link>
      </div>
    </section>
  );
}

export default Transaction;
