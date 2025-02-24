import copy from "copy-to-clipboard";
import { notify } from "./ReferEarnBox";
import { BiCopy } from "react-icons/bi";

import Image from "next/image";
import Countdown from "react-countdown";
import { useQuery } from "@tanstack/react-query";
import { getTransaction } from "@/utils/actions/transaction.actions";
import LoadingSpinner from "./LoadingSpinner";
import CustomButton from "./ui/CustomButton";

import { TRANSFER_METHODS } from "@/constants";
import InBoxLoader from "./InBoxLoader";
import { ScrollArea } from "./ui/scroll-area";

type DepositTransCreatedProps = {
  transOBJ: {
    transferMethod: string;
    transaction: string;

    amountToReceive: number;
  };
  resetState: () => void;
};

function DepositTransCreated({
  transOBJ,
  resetState,
}: DepositTransCreatedProps) {
  const { transferMethod, amountToReceive, transaction: id } = transOBJ;
  const {
    data: transaction,
    error,
    status: transactionStatus,
  } = useQuery({
    queryKey: ["transaction"],
    queryFn: () => {
      return getTransaction({ id });
    },
    enabled: !!id,
  });

  if (transactionStatus === "pending") return <InBoxLoader />;

  const { transactionId, createdAt, amount, fee } = transaction!;

  // convert createdAt to date and add 24 hours
  const date = new Date(createdAt).getTime() + 24 * 60 * 60 * 1000;

  function handleIdCopy() {
    copy(transactionId);
    console.log("copied");
    notify();
  }
  const transferMethodObj = TRANSFER_METHODS.find(
    (method) => method.key === transferMethod,
  )!;
  function handleWalletAdressCopy() {
    copy(transferMethodObj.depositAddress);
    console.log("copied");
    notify("Wallet address copied");
  }

  return (
    <section className="flex h-full flex-col gap-8 md:grid lg:grid-cols-[1fr_minmax(250px,300px)]">
      <div className="rounded-2xl bg-gray-50 p-10">
        <ScrollArea className="h-full w-full lg:h-[800px]">
          <div className="flex w-full flex-col gap-5">
            <div className="flex flex-wrap justify-between gap-2 px-4 font-dm_sans text-2xl font-bold text-siteHeadingDark sm:items-center sm:gap-0 sm:px-5 lg:text-3xl">
              <h4 className="text-siteGreen">Activity Details</h4>
              <p className="">
                <span className="text-siteHeadingDark/50">#</span>
                <span className="">{transactionId}</span>
              </p>
            </div>
            <div className="flex h-full flex-col gap-1 rounded-xl border border-siteHeadingDark/25 p-4 sm:p-5">
              <div className="flex w-full items-center justify-between font-dm_sans text-siteHeadingDark">
                <span className="text-xl font-bold capitalize sm:text-2xl">
                  Deposit Transaction
                </span>
                <span className="text-xl font-bold capitalize sm:text-2xl">
                  ${amount}
                </span>
              </div>
              <div className="flex w-full items-center justify-between font-dm_sans text-siteHeadingDark/50">
                <span className="font-bold capitalize">Amount to recive</span>
                <span className="font-bold capitalize">
                  {" "}
                  +${amountToReceive}
                </span>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <div className="relative w-full border-b border-siteHeadingDark/25 p-5">
                <span className="after:content-[' '] relative grid w-32 place-items-center font-dm_sans text-xl font-bold text-siteHeadingDark after:absolute after:bottom-[-20px] after:left-0 after:block after:h-[4px] after:w-32 after:bg-siteGreen">
                  Details
                </span>
              </div>
              <div className="flex w-full flex-col gap-2 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-dashed border-siteHeadingDark/25 py-3 font-dm_sans">
                  <span className="text-lg font-semibold text-siteHeadingDark/70">
                    Transaction ID
                  </span>
                  <div className="flex items-center gap-2 text-lg font-semibold text-black">
                    <span className="">#{transactionId}</span>
                    <button
                      className="text-2xl text-green-600"
                      onClick={() => handleIdCopy()}
                    >
                      <BiCopy />
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between border-b-2 border-dashed border-siteHeadingDark/25 py-3 font-dm_sans">
                  <span className="text-lg font-semibold text-siteHeadingDark/70">
                    Transaction Fee
                  </span>
                  <div className="flex items-center gap-2 text-lg font-semibold text-black">
                    <span className="">${fee}</span>
                  </div>
                </div>
                <div className="flex w-full flex-col flex-wrap justify-between gap-5 border-b-2 border-dashed border-siteHeadingDark/25 py-3 font-dm_sans sm:flex-row sm:items-center">
                  <span className="shrink-0 text-lg font-semibold text-siteHeadingDark/70">
                    {transferMethod} wallet address
                  </span>
                  <div className="flex flex-col items-center justify-end gap-2 text-lg font-black text-black">
                    <div className="flex w-full flex-col items-center justify-end gap-3 text-lg text-black md:flex-row">
                      <span className="break-all text-lg font-medium md:text-xl">
                        {transferMethodObj.depositAddress}
                      </span>
                      <button
                        className="hidden items-center gap-4 font-archivo text-sm font-semibold uppercase md:flex md:text-2xl"
                        onClick={() => handleWalletAdressCopy()}
                      >
                        <span className="md:hidden">Copy wallet address</span>{" "}
                        <span className="text-green-600">
                          <BiCopy />
                        </span>{" "}
                      </button>
                      <button
                        className="flex w-full items-center justify-between gap-4 rounded-xl bg-gray-200 p-4 font-archivo text-sm font-semibold uppercase md:hidden md:text-2xl"
                        onClick={() => handleWalletAdressCopy()}
                      >
                        <span className="md:hidden">Copy wallet address</span>{" "}
                        <span className="text-2xl text-green-600">
                          <BiCopy />
                        </span>{" "}
                      </button>
                    </div>
                  </div>
                </div>

                {transferMethod === "USDT" && (
                  <div className="flex items-center justify-between border-b-2 border-dashed border-siteHeadingDark/25 py-3 font-dm_sans">
                    <span className="text-lg font-semibold text-siteHeadingDark/70">
                      Network
                    </span>
                    <div className="flex items-center gap-2 text-lg font-semibold text-black">
                      <span className="">{transferMethodObj.network}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className="flex w-full flex-col items-center gap-2">
                <p className="font-dm_sans text-2xl font-bold capitalize">
                  Remaining Time
                </p>
                <span className="font-dm_sans text-[70px] font-bold leading-[100%]">
                  <Countdown daysInHours={true} date={date} />
                </span>
              </div>
              <div className="flex w-full items-center justify-center gap-4">
                <CustomButton
                  text="Deposit Again"
                  bgColor="green"
                  hoverBgColor="orange"
                  textColor="white"
                  onClickFn={() => resetState()}
                />
              </div>
            </div>
          </div>
        </ScrollArea>
      </div>
      <div className="m-w-[350px] flex w-full flex-col items-center gap-4 lg:items-start">
        <h4 className="mt-5 font-syne text-2xl font-bold text-siteGreen sm:items-center lg:text-3xl">
          Scan to pay
        </h4>
        <Image
          src={
            transferMethod === "BTC"
              ? "/Fastrack_Btc_Barcode.jpg"
              : transferMethod === "USDT"
                ? "/Fastrack_USDT_Barcode.jpg"
                : "/Fastrack_ETH_Barcode.jpg"
          }
          alt="image"
          className="rounded-xl"
          width={350}
          height={600}
        />
      </div>
    </section>
  );
}

export default DepositTransCreated;
