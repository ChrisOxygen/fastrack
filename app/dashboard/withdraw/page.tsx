"use client";

import { UserData } from "@/app/dashboard/layout";
import useFetchUserData from "@/hooks/useFetchUserData";
import { Radio, RadioGroup } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";

import ConfirmWithdrawalTrans from "@/components/ConfirmWithdrawalTrans";
import TransactionSuccess from "@/components/TransactionSuccess";
import LoadingSpinner from "@/components/LoadingSpinner";
import StepDisplay from "@/components/StepDisplay";

import clsx from "clsx";
import { WithdrawalDetails } from "@/types";
import { createWithdrawalTransaction } from "@/utils/actions/transaction.actions";

type FormInputs = {
  amount: number;
  withdrawalMethod: "USDT" | "BTC";
  walletAddress: string;

  fee: number;
  tax: number;
  network?: string;
  deductableAmount: number;
};

function WithdrawScreen() {
  const [step, setStep] = useState(1);
  const [inputValues, setInputValues] = useState<WithdrawalDetails | null>(
    null,
  );
  const [transID, setTransID] = useState<string | null>(null);

  const { session, data } = useFetchUserData();
  const { balance } = data as UserData;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (details: WithdrawalDetails) => {
      return createWithdrawalTransaction({
        ...details,
        userId: session?.user.id!,
      });
    },
    onError: (error) => {
      const { message, field } = error as any;
      setError(field, { message });
      setStep(1);
    },
    onSuccess: (data) => {
      console.log(data);

      const { transactionId } = data;
      setTransID(transactionId);

      setStep(3);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const {
    register,
    handleSubmit,
    trigger,
    watch,
    getValues,
    control,
    setValue,
    reset,

    setError,
    formState: { errors, isLoading, isSubmitting, isValidating },
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    setInputValues(data);

    setStep(2);
  };

  function handleNextStep() {
    handleSubmit(onSubmit)();
  }

  if (watch("amount") > 0) {
    console.log("error", errors.amount);
    setValue("fee", 1);
    setValue("tax", watch("amount") * 0);
    setValue(
      "deductableAmount",
      watch("amount") + getValues("tax") + getValues("fee"),
    );
  }

  function amountValidation(value: number) {
    const { tax, fee } = getValues();
    console.log(tax, fee, "value", value);
    if (value > 0) {
      const total = +value + tax + fee;

      console.log(total, balance);

      if (total > balance) {
        return "Insufficient balance";
        // return false;
      } else {
        return true;
      }
    }
  }

  const deductable = +watch("amount") + getValues("tax") + getValues("fee");

  if (isLoading || isSubmitting || isValidating || isPending) {
    return <LoadingSpinner />;
  }

  const resetState = () => {
    setStep(1);
    setInputValues(null);
    reset();
  };

  const submitAfterConfirmation = () => {
    mutate(inputValues!);
  };

  return (
    <section className="flex h-screen flex-col gap-16 overflow-hidden">
      <StepDisplay step={step} />
      {step === 1 && (
        <div className="mx-auto flex w-full max-w-[700px] flex-col overflow-auto p-5">
          <span className="font-dm_sans text-3xl font-bold">Withdraw</span>
          <form action="" className="">
            <div className="flex w-full flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="" className="font-dm_sans font-semibold">
                  Amount To Withdraw:
                </label>
                <div className="flex items-stretch overflow-hidden rounded-xl border border-siteHeadingDark/25">
                  <input
                    type="number"
                    id=""
                    className="w-full px-3 py-2 font-dm_sans text-3xl font-semibold [appearance:textfield] focus:border-none focus:outline-none active:border-none active:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    placeholder="0.00"
                    {...register("amount", {
                      required: true,
                      valueAsNumber: true,
                      validate: {
                        amountValidation,
                        minValidation: (value) => {
                          if (value > 9) {
                            return true;
                          }
                          return "Minimum amount to withdraw is $10";
                        },
                      },
                      onChange: () => {
                        trigger("amount");
                      },
                    })}
                  />
                  <div className="grid place-items-center self-stretch bg-siteHeadingDark/25 px-3 font-dm_sans text-3xl text-gray-700/30">
                    <span className=" ">USD</span>
                  </div>
                </div>
                <div className="flex w-full items-center justify-between font-dm_sans">
                  <span className="font-bold capitalize text-siteHeadingDark/35">
                    Available balance: ${balance}
                  </span>
                  {errors?.amount && (
                    <span className="capitalize text-red-500">
                      {errors?.amount.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex w-full flex-col gap-2">
                <label
                  htmlFor="withdrawalMethodId"
                  className="font-dm_sans font-semibold"
                >
                  Withdrawal Method:
                </label>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-6">
                    <Controller
                      control={control}
                      name="withdrawalMethod"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <RadioGroup
                          id="withdrawalMethodId"
                          orientation="horizontal"
                          value={value}
                          onValueChange={onChange}
                        >
                          <Radio value="USDT">USDT</Radio>
                          <Radio value="BTC">BTC</Radio>
                        </RadioGroup>
                      )}
                    />
                  </div>
                  {errors?.withdrawalMethod && (
                    <span className="capitalize text-red-500">
                      {errors?.withdrawalMethod.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor=""
                  className="font-dm_sans font-bold text-siteHeadingDark"
                >
                  Wallet Address
                </label>
                <div className="flex items-stretch overflow-hidden rounded-xl border border-siteHeadingDark/25">
                  <input
                    type="text"
                    id=""
                    className="w-full px-3 py-2 font-dm_sans text-2xl font-semibold focus:border-none focus:outline-none active:border-none active:outline-none"
                    {...register("walletAddress", { required: true })}
                  />
                </div>

                {errors?.walletAddress && (
                  <span className="capitalize text-red-500">
                    {errors?.walletAddress.message}
                  </span>
                )}
              </div>
              {watch("withdrawalMethod") === "USDT" && (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor=""
                    className="font-dm_sans font-bold text-siteHeadingDark"
                  >
                    Network
                  </label>
                  <div className="flex items-stretch overflow-hidden rounded-xl border border-siteHeadingDark/25">
                    <input
                      type="email"
                      id=""
                      className="w-full px-3 py-2 font-dm_sans text-2xl font-semibold focus:border-none focus:outline-none active:border-none active:outline-none"
                      {...register("network", { required: true })}
                    />
                  </div>

                  {errors?.network && (
                    <span className="capitalize text-red-500">
                      {errors?.network.message}
                    </span>
                  )}
                </div>
              )}

              <div className="rounded-2xl border border-siteHeadingDark/25 p-4">
                <span className="font-dm_sans font-bold text-siteHeadingDark/25">
                  TRANSFER DETAILS
                </span>
                <div className="flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
                      <p className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-green-700"></span>
                        <span className="text-siteHeadingDark/50">
                          Transfer fee
                        </span>
                      </p>
                      <span className="">1$</span>
                    </div>
                  </div>
                  <span className="grid h-[1px] bg-siteHeadingDark/25"></span>
                  <div className="flex flex-col gap-2">
                    <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
                      <p className="flex items-center gap-1">
                        <span className="">DEDUCTABLE</span>
                      </p>
                      <span className="">
                        {watch("amount") > 9 ? deductable.toFixed(2) : 0} USD
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <input
                type="number"
                className=""
                hidden
                {...register("tax", {})}
              />

              <input
                type="number"
                className=""
                hidden
                {...register("fee", {})}
              />
              <input
                type="number"
                className=""
                hidden
                {...register("deductableAmount", {
                  valueAsNumber: true,
                  required: true,
                })}
              />
              <button
                disabled={
                  watch("withdrawalMethod") === undefined ||
                  watch("withdrawalMethod") === null
                }
                className={clsx(
                  "w-full rounded-xl bg-siteGreen p-4 font-dm_sans font-bold text-white",
                  watch("withdrawalMethod") === undefined ||
                    watch("withdrawalMethod") === null
                    ? "cursor-not-allowed bg-siteGreen/50"
                    : "bg-siteGreen",
                )}
                onClick={function (e) {
                  e.preventDefault();
                  handleNextStep();
                }}
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      )}
      {step === 2 && (
        <ConfirmWithdrawalTrans
          values={inputValues!}
          reset={resetState}
          taxPecentage={0}
          submitAfterConfirmation={submitAfterConfirmation}
        />
      )}
      {step === 3 && (
        <TransactionSuccess
          transactionId={transID!}
          view="withdraw"
          reset={resetState}
        />
      )}
    </section>
  );
}

export default WithdrawScreen;
