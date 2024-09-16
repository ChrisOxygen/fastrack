"use client";

import { UserData } from "@/app/dashboard/layout";
import useFetchUserData from "@/hooks/useFetchUserData";
import { Checkbox, Radio, RadioGroup } from "@nextui-org/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Reducer, use, useEffect, useReducer } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import {
  BankWithdrawalDetailsType,
  initiateWithdrawal,
  PayPalWithdrawalDetailsType,
} from "@/utils/services";
import ConfirmWithdrawalTrans from "@/components/ConfirmWithdrawalTrans";
import TransactionSuccess from "@/components/TransactionSuccess";
import LoadingSpinner from "@/components/LoadingSpinner";
import StepDisplay from "@/components/StepDisplay";

const bankFees = {
  transferFee: 2.5,
  tax: 0.03,
};

const paypalFees = {
  transferFee: 3.2,
  tax: 0.02,
};

type FormInputs = {
  amount: number;
  withdrawalMethod: "bank" | "paypal";
  bankName?: string;
  accountNumber?: string;
  accountName?: string;
  payPalEmail?: string;
  fee: number;
  tax: number;
  deductableAmount: number;
};

type InitialStateType = {
  step: number;
  loading: boolean;
  taxPecentage: number;
  withdrawalFee: number;
  withdrawalMethod: "bank" | "paypal";

  inputValues: {
    amount: number;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    payPalEmail?: string;
    fee: number;
    tax: number;
    deductableAmount: number;
  };
  transID: string;
};

type ReducerActionType = {
  type: string;
  payLoad?: any;
};

const initialState: InitialStateType = {
  step: 1,
  loading: false,
  taxPecentage: 0.03,
  withdrawalFee: 2.5,

  withdrawalMethod: "bank" as "bank" | "paypal",

  inputValues: {
    amount: 0.0,
    bankName: "",
    accountNumber: "",
    accountName: "",
    fee: 0,
    tax: 0,
    deductableAmount: 0,
    payPalEmail: "",
  },
  transID: "",
};

function reducer(state: InitialStateType, action: ReducerActionType) {
  switch (action.type) {
    case "setStep":
      return { ...state, step: action.payLoad };
    case "setTaxPecentageAndFee":
      return {
        ...state,
        taxPecentage: action.payLoad.tax,
        withdrawalFee: action.payLoad.transferFee,
      };

    case "setInputValues":
      return {
        ...state,
        withdrawalMethod: action.payLoad.withdrawalMethod,
        inputValues: action.payLoad.inputValues,
      };

    case "setTransID":
      return { ...state, transID: action.payLoad };
    case "reset":
      return { ...initialState };

    default:
      throw new Error("unknown action");
  }
}

function WithdrawScreen() {
  const [state, dispatch] = useReducer<
    Reducer<InitialStateType, ReducerActionType>
  >(reducer, initialState);
  const {
    step,
    loading,
    withdrawalFee,
    taxPecentage,
    inputValues,
    withdrawalMethod,
    transID,
  } = state;

  const { session, data, status } = useFetchUserData();
  const { balance } = data as UserData;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      const paypalDetails = {} as PayPalWithdrawalDetailsType;

      const bankDetails = {} as BankWithdrawalDetailsType;

      if (withdrawalMethod === "paypal") {
        paypalDetails.payPalEmail = inputValues.payPalEmail!;
        paypalDetails.amount = inputValues.amount;
        paypalDetails.fee = withdrawalFee;
        paypalDetails.tax = taxPecentage;
        paypalDetails.deductableAmount = inputValues.deductableAmount;

        return initiateWithdrawal(paypalDetails, session?.user.id!);
      }

      bankDetails.bankName = inputValues.bankName!;
      bankDetails.accountNumber = inputValues.accountNumber!;
      bankDetails.accountName = inputValues.accountName!;
      bankDetails.amount = inputValues.amount;
      bankDetails.fee = withdrawalFee;
      bankDetails.tax = taxPecentage;
      bankDetails.deductableAmount = inputValues.deductableAmount;

      return initiateWithdrawal(bankDetails, session?.user.id!);
    },
    onError: (error) => {
      const { message, field } = error as any;
      setError(field, { message });
      setStep(1);
    },
    onSuccess: (data) => {
      if (data.transactionId) {
        dispatch({ type: "setTransID", payLoad: data.transactionId });
        setStep(3);
      }
      console.log("success", data, "step", step);
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

    setError,
    formState: { errors, isLoading, isSubmitting, isValidating },
  } = useForm<FormInputs>({
    defaultValues: { ...inputValues, withdrawalMethod: "bank" },
  });

  function setStep(step: number) {
    dispatch({ type: "setStep", payLoad: step });
  }

  function resetState() {
    dispatch({ type: "reset" });
  }

  const submitAfterConfirmation = async () => {
    mutate();
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    const { withdrawalMethod, ...inputValues } = data;

    dispatch({
      type: "setInputValues",
      payLoad: { withdrawalMethod, inputValues },
    });
    setStep(2);

    // submitAfterConfirmation();
  };

  function handleNextStep() {
    handleSubmit(onSubmit)();
  }

  if (watch("amount") > 0) {
    console.log("error", errors.amount);
    setValue("fee", withdrawalFee);
    setValue("tax", watch("amount") * taxPecentage);
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

  if (
    status === "pending" ||
    isLoading ||
    isSubmitting ||
    isValidating ||
    isPending
  ) {
    return <LoadingSpinner />;
  }

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
                  <div className="z-[-1] flex items-center gap-6">
                    <Controller
                      control={control}
                      name="withdrawalMethod"
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <RadioGroup
                          id="withdrawalMethodId"
                          orientation="horizontal"
                          onValueChange={onChange}
                          value={value}
                          onChange={() => {
                            dispatch({
                              type: "setTaxPecentageAndFee",
                              payLoad: value === "bank" ? bankFees : paypalFees,
                            });
                          }}
                        >
                          <Radio value="paypal">Paypal</Radio>
                          <Radio value="bank">Bank Transfer</Radio>
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
              {watch("withdrawalMethod") === "paypal" ? (
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor=""
                    className="font-dm_sans font-bold text-siteHeadingDark"
                  >
                    Enter PayPal Email
                  </label>
                  <div className="flex items-stretch overflow-hidden rounded-xl border border-siteHeadingDark/25">
                    <input
                      type="email"
                      id=""
                      className="w-full px-3 py-2 font-dm_sans text-2xl font-semibold focus:border-none focus:outline-none active:border-none active:outline-none"
                      {...register("payPalEmail", { required: true })}
                    />
                  </div>

                  {errors?.payPalEmail && (
                    <span className="capitalize text-red-500">
                      {errors?.payPalEmail.message}
                    </span>
                  )}
                </div>
              ) : (
                <div className="">
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor=""
                      className="font-dm_sans font-bold text-siteHeadingDark"
                    >
                      Bank Name
                    </label>
                    <div className="flex items-stretch overflow-hidden rounded-xl border border-siteHeadingDark/25">
                      <input
                        type="text"
                        id=""
                        className="w-full px-3 py-2 font-dm_sans text-2xl font-semibold focus:border-none focus:outline-none active:border-none active:outline-none"
                        {...register("bankName", { required: true })}
                      />
                    </div>

                    {errors?.bankName && (
                      <span className="capitalize text-red-500">
                        {errors?.bankName.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor=""
                      className="font-dm_sans font-bold text-siteHeadingDark"
                    >
                      Acount Number
                    </label>
                    <div className="flex items-stretch overflow-hidden rounded-xl border border-siteHeadingDark/25">
                      <input
                        type="number"
                        id=""
                        className="w-full px-3 py-2 font-dm_sans text-2xl font-semibold focus:border-none focus:outline-none active:border-none active:outline-none"
                        {...register("accountNumber", { required: true })}
                      />
                    </div>

                    {errors?.accountNumber && (
                      <span className="capitalize text-red-500">
                        {errors?.accountNumber.message}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor=""
                      className="font-dm_sans font-bold text-siteHeadingDark"
                    >
                      Acount Name
                    </label>
                    <div className="flex items-stretch overflow-hidden rounded-xl border border-siteHeadingDark/25">
                      <input
                        type="text"
                        id=""
                        className="w-full px-3 py-2 font-dm_sans text-2xl font-semibold focus:border-none focus:outline-none active:border-none active:outline-none"
                        {...register("accountName", { required: true })}
                      />
                    </div>

                    {errors?.accountName && (
                      <span className="capitalize text-red-500">
                        {errors?.accountName.message}
                      </span>
                    )}
                  </div>
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
                      <span className="">{withdrawalFee}$</span>
                    </div>
                    <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
                      <p className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-green-700"></span>
                        <span className="text-siteHeadingDark/50">Tax</span>
                      </p>
                      <span className="">244 USD({taxPecentage} %)</span>
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
                className="w-full rounded-xl bg-siteGreen p-4 font-dm_sans font-bold text-white"
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
          values={inputValues}
          reset={resetState}
          taxPecentage={taxPecentage}
          submitAfterConfirmation={submitAfterConfirmation}
        />
      )}
      {step === 3 && (
        <TransactionSuccess
          transactionId={transID}
          view="withdraw"
          reset={resetState}
        />
      )}
    </section>
  );
}

export default WithdrawScreen;
