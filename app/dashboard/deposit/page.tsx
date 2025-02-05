"use client";

import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import LoadingSpinner from "@/components/LoadingSpinner";
import StepDisplay from "@/components/StepDisplay";

import clsx from "clsx";

import DepositTransCreated from "@/components/DepositTransCreated";
import { useSession } from "next-auth/react";
import { createDepositTransaction } from "@/utils/actions/transaction.actions";

export type CyptoTransferMethodType = "BTC" | "USDT" | "ETH" | null;

type FormInputs = {
  amount: number;
  transferMethod: CyptoTransferMethodType;
  transferFee: number;
  amountToReceive: number;
};

export type mutationReturnType = {
  message: string;
  transaction: {
    amount: number;
    amountToReceive: number;
    createdAt: string;
    fee: number;
    status: string;
    transactionId: string;
    transferMethod: CyptoTransferMethodType;
    type: string;
    updatedAt: string;
    user: string;
    __v: number;
    _id: string;
  };
};

function Deposit() {
  const [step, setStep] = useState(1);
  const [transferMethod, setTransferMethod] =
    useState<CyptoTransferMethodType>(null);

  const [transOBJ, setTransOBJ] = useState<{
    transferMethod: string;
    amountToReceive: number;
    transaction: string;
  } | null>(null);

  const queryClient = useQueryClient();

  const { data: session, status } = useSession();

  const { mutate, isPending } = useMutation({
    mutationFn: createDepositTransaction,
    onError: (error) => {},
    onSuccess: (data) => {
      reset();
      setTransferMethod(null);

      const {
        transferMethod,

        transaction,
        amountToReceive,
      } = data;

      setTransOBJ({
        transferMethod,
        amountToReceive,
        transaction,
      });

      setStep(2);

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    reset,
    formState: { errors, isLoading, isSubmitting, isValidating },
  } = useForm<FormInputs>({
    defaultValues: {
      amount: 0,
      transferMethod: null,
      transferFee: 1,
      amountToReceive: 0,
    },
  });

  function resetState() {
    setStep(1);
  }

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("onsubmit", data);

    mutate({ ...data, tax: 0, userId: session?.user.id! });
  };

  if (
    status === "loading" ||
    isLoading ||
    isSubmitting ||
    isValidating ||
    isPending
  ) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <section className="mt-16 flex flex-col gap-16 sm:mt-0">
        <StepDisplay step={step} />

        {step === 1 && (
          <div className="flex w-full flex-col items-center">
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="flex w-full max-w-[400px] flex-col items-center gap-5 font-dm_sans"
            >
              <p className="text-center font-dm_sans text-2xl font-bold text-siteHeadingDark">
                Amount to deposit
              </p>
              <div className="relative flex w-full max-w-[300px] flex-col items-center">
                <div className="flex w-full justify-center">
                  <span className="grid place-items-center py-3 text-center font-dm_sans text-6xl font-bold leading-none text-siteHeadingDark">
                    $
                  </span>
                  <input
                    type="number"
                    {...register("amount", {
                      required: true,
                      onChange: () => {
                        const inputAmount = +getValues("amount");
                        const tfFee = getValues("transferFee");

                        if (inputAmount && inputAmount > 0) {
                          setValue("amountToReceive", inputAmount - tfFee);
                        }
                      },
                    })}
                    placeholder="0.00"
                    className="inputField py-3 font-dm_sans text-6xl font-bold text-siteHeadingDark placeholder-shown:text-siteHeadingDark/10 focus:border-0 focus:outline-none active:border-0 active:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  />
                </div>
                <span className=""></span>
              </div>
              <input
                type="text"
                hidden
                className=""
                {...register("transferFee", { required: true })}
              />
              <input
                type="text"
                hidden
                className=""
                {...register("transferMethod", { required: true })}
              />
              <input
                type="text"
                hidden
                className=""
                {...register("amountToReceive", { required: true })}
              />
              <div className="flex w-full flex-col gap-4">
                <div className="grid w-full max-w-[400px] grid-cols-[minmax(50px,1fr)_max-content_minmax(50px,1fr)] items-center gap-5">
                  <span className="h-[1px] w-full bg-siteHeadingDark/25"></span>
                  <p className="">Available deposit methods</p>
                  <span className="h-[1px] w-full bg-siteHeadingDark/25"></span>
                </div>
                <div className="flex w-full gap-4">
                  <button
                    className={clsx(
                      "w-full rounded-xl border border-siteGreen px-6 py-5 font-dm_sans text-xl",
                      transferMethod === "BTC"
                        ? "bg-siteGreen text-white"
                        : "bg-transparent text-siteGreen",
                    )}
                    onClick={() => {
                      setValue("transferMethod", "BTC");
                      setTransferMethod("BTC");
                    }}
                  >
                    BTC
                  </button>
                  <button
                    className={clsx(
                      "w-full rounded-xl border border-siteGreen px-6 py-5 font-dm_sans text-xl",
                      transferMethod === "USDT"
                        ? "bg-siteGreen text-white"
                        : "bg-transparent text-siteGreen",
                    )}
                    onClick={() => {
                      setValue("transferMethod", "USDT");
                      setTransferMethod("USDT");
                    }}
                  >
                    USDT
                  </button>
                  <button
                    className={clsx(
                      "w-full rounded-xl border border-siteGreen px-6 py-5 font-dm_sans text-xl",
                      transferMethod === "ETH"
                        ? "bg-siteGreen text-white"
                        : "bg-transparent text-siteGreen",
                    )}
                    onClick={() => {
                      setValue("transferMethod", "ETH");
                      setTransferMethod("ETH");
                    }}
                  >
                    ETH
                  </button>
                </div>
              </div>
              <button
                disabled={transferMethod === null || +watch("amount") < 2}
                className={clsx(
                  "w-full rounded-xl bg-siteHeadingDark py-5 font-dm_sans text-xl text-white",
                  (transferMethod === null || +watch("amount") < 2) &&
                    "cursor-not-allowed opacity-50",
                )}
                onClick={handleSubmit(onSubmit)}
              >
                Create Transaction
              </button>
            </form>

            <div className="flex w-full max-w-[800px] flex-col gap-2 font-dm_sans">
              <p className="font-bold capitalize text-siteGreen underline">
                Instructions:
              </p>
              <p className="">
                Enter the amount you wish to deposit, then select a deposit
                method from the available deposit methods. When you are done,
                click on the create transaction button to continue. This will
                take you to the next step where you will be able to view the
                wallet address to send the funds to, and also you&apos;ll find a{" "}
                <strong>transaction ID</strong> that you will use as the
                reference when making the payment.{" "}
                <strong>
                  This is very important, as it will help us to track your
                  payment and credit your account accordingly
                </strong>
                . you can also copy the wallet address by clicking on the copy
                icon next to the address. After generating the transaction, you
                have 24 hours to make the payment. if you fail to make the
                payment within the stipulated time, the transaction will be
                cancelled and you have to create a new transaction.
              </p>
            </div>
          </div>
        )}

        {step === 2 && transOBJ && (
          <DepositTransCreated transOBJ={transOBJ} resetState={resetState} />
        )}
      </section>
    </>
  );
}

export default Deposit;
