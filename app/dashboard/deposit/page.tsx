"use client";

import { Select, SelectItem } from "@nextui-org/react";
import { Dispatch, Reducer, useEffect, useReducer, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FiX } from "react-icons/fi";
import useFetchUserData from "@/hooks/useFetchUserData";
import { UserData } from "@/app/dashboard/layout";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { initiateDeposit } from "@/utils/services";
import TransactionSuccess from "@/components/TransactionSuccess";
import ConfirmTransaction from "@/components/ConfirmTransaction";
import LoadingSpinner from "@/components/LoadingSpinner";
import StepDisplay from "@/components/StepDisplay";

const transferMethods = [
  {
    id: 1,
    key: "Bank Transfer",
    label: "Bank Transfer",
    icon: "bank",
  },
  {
    id: 2,
    key: "Card Transfer",
    label: "Card Transfer",
    icon: "credit-card",
  },
  {
    id: 3,
    key: "Paypal",
    label: "Paypal",
    icon: "paypal",
  },
];

type FormInputs = {
  amount: number;
  transferMethod: TransferMethodType;
  tax: number;
  transferFee: number;
  amountToReceive: number;
};

export type TransferMethodType = "Bank Transfer" | "Card Transfer" | "Paypal";

const bankTransferDetails = {
  bankName: "Bank of America",
  accountNumber: "1234567890",
  accountName: "kudizen/",
  transferFee: 1.52,
  taxPecentage: 0.027,
};

type InitialStateType = {
  step: number;
  loading: boolean;
  transferFee: number;
  taxPecentage: number;
  transferMethod: TransferMethodType;
  inputData: {
    hasValidated: boolean;
    values: {
      amount: number;
      transferMethod: TransferMethodType;
      transferFee: number;
      tax: number;
      amountToReceive: number;
    };
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
  transferFee: bankTransferDetails.transferFee,
  taxPecentage: bankTransferDetails.taxPecentage,
  transferMethod: "Bank Transfer",

  inputData: {
    hasValidated: false,
    values: {
      amount: 0.0,
      transferMethod: "Bank Transfer",
      transferFee: bankTransferDetails.transferFee,
      tax: 0,
      amountToReceive: 0,
    },
  },

  transID: "",
};

function reducer(state: InitialStateType, action: ReducerActionType) {
  switch (action.type) {
    case "nextStep":
      return { ...state, step: state.step + 1 };
    case "setTransferFee":
      return { ...state, transferFee: action.payLoad };
    case "setTaxPecentage":
      return { ...state, taxPecentage: action.payLoad };
    case "setInputData":
      return {
        ...state,
        inputData: { ...state.inputData, values: action.payLoad },
      };

    case "setTransID":
      return { ...state, transID: action.payLoad };

    case "reset":
      return { ...initialState };

    default:
      throw new Error("unknown action");
  }
}

function Deposit() {
  const [state, dispatch] = useReducer<
    Reducer<InitialStateType, ReducerActionType>
  >(reducer, initialState);
  const {
    step,
    loading,
    transferFee,
    taxPecentage,
    transferMethod,
    inputData,
    transID,
  } = state;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return initiateDeposit(inputData.values, session?.user.id!);
    },
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (data) => {
      if (data.message === "New deposite transaction created") {
        dispatch({ type: "setTransID", payLoad: data.transactionId });

        setStep(3);
      }

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const { data, error, status, session } = useFetchUserData();

  const { firstName, lastName } = data as UserData;

  const fullName = `${firstName} ${lastName}`;

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isLoading, isSubmitting, isValidating },
  } = useForm({
    values: inputData.values,
  });

  useEffect(() => {
    const tf = watch("transferMethod");

    if (tf === "Bank Transfer") {
      dispatch({
        type: "setTransferFee",
        payLoad: bankTransferDetails.transferFee,
      });
      dispatch({
        type: "setTaxPecentage",
        payLoad: bankTransferDetails.taxPecentage,
      });
    }

    console.log("transferMethod", tf);
  }, [watch]);

  function handleNextStep() {
    console.log("clicked next");
    handleSubmit(onSubmit)();
  }

  function resetState() {
    dispatch({ type: "reset" });
  }

  function setStep(step: number) {
    dispatch({ type: "nextStep" });
  }

  const submitAfterConfirmation = async () => {
    console.log("submitting");

    mutate();
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("onsubmit", data);

    dispatch({ type: "setInputData", payLoad: data });

    // wait for 2 seconds to simulate API call

    setStep(2);
  };

  const amountToReceive = (
    watch("amount") -
    (transferFee + watch("amount") * taxPecentage)
  ).toFixed(2);

  const amount = watch("amount");
  if (amount > 0) {
    setValue("tax", +(amount * taxPecentage).toFixed(2));
    setValue(
      "amountToReceive",
      +(amount - (transferFee + amount * taxPecentage)).toFixed(2),
    );
  }

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
    <section className="mt-16 flex flex-col gap-16 sm:mt-0">
      <StepDisplay step={step} />

      {step === 1 && (
        <div className="mx-auto flex w-full max-w-[700px] flex-col">
          <span className="mb-2 font-dm_sans font-bold text-siteHeadingDark">
            Deposit amount
          </span>
          <form className="flex w-full flex-col gap-4">
            <div className="">
              <div className="mb-1 flex items-stretch overflow-hidden rounded-xl border border-siteHeadingDark/25">
                <input
                  type="number"
                  id=""
                  className="w-full px-3 py-2 font-dm_sans text-3xl font-semibold"
                  {...register("amount", { required: true, max: 1000000 })}
                />
                <div className="grid place-items-center self-stretch bg-siteHeadingDark/25 px-3 font-dm_sans text-3xl text-gray-700/30">
                  <span className=" ">USD</span>
                </div>
              </div>
              {errors.amount && (
                <span className=" ">max deposit is $10,000</span>
              )}
            </div>
            <div className="z-[-1] w-full">
              <Select
                items={transferMethods}
                label="Payment Method"
                className="w-full"
                disabledKeys={["Card Transfer", "Paypal"]}
                {...register("transferMethod", {
                  required: true,
                })}
              >
                {(method) => (
                  <SelectItem key={method.key}>{method.label}</SelectItem>
                )}
              </Select>
            </div>
            <div className="rounded-2xl border border-siteHeadingDark/25 p-4">
              {transferMethod === "Bank Transfer" && (
                <BankTrandferDetails fullName={fullName} />
              )}
              <div className="flex flex-col gap-3">
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
                    <p className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-700"></span>
                      <span className="text-siteHeadingDark/50">
                        Transfer fee
                      </span>
                    </p>
                    <span className="">${transferFee}</span>
                  </div>
                  <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
                    <p className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-700"></span>
                      <span className="text-siteHeadingDark/50">Tax</span>
                    </p>
                    <span className="">{`$${
                      (watch("amount") * taxPecentage).toFixed(2) || 0
                    } (${taxPecentage}%)`}</span>
                  </div>
                </div>
                <span className="grid h-[1px] bg-siteHeadingDark/25"></span>
                <input
                  type="number"
                  className=""
                  hidden
                  {...register("tax", {
                    value: +(watch("amount") * taxPecentage).toFixed(2),
                  })}
                />
                <input
                  type="number"
                  className=""
                  hidden
                  {...register("transferFee")}
                />
                <input
                  type="number"
                  className=""
                  hidden
                  {...register("amountToReceive")}
                />
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
                    <p className="flex items-center gap-1">
                      <span className="">AMOUNT TO RECEIVE</span>
                    </p>
                    <span className="">
                      {+amountToReceive < 0 ? 0 : amountToReceive} USD
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="w-full rounded-xl bg-siteGreen p-4 font-dm_sans font-bold text-white"
              onClick={function (e) {
                e.preventDefault();
                handleNextStep();
              }}
            >
              Continue
            </button>
          </form>
        </div>
      )}
      {step === 2 && (
        <ConfirmTransaction
          inputData={state.inputData}
          reset={resetState}
          taxPecentage={taxPecentage}
          submitAfterConfirmation={submitAfterConfirmation}
          transactionType="deposit"
        />
      )}
      {step === 3 && (
        <TransactionSuccess
          reset={resetState}
          transactionId={transID}
          view="deposit"
        />
      )}
    </section>
  );
}

export default Deposit;

function BankTrandferDetails({ fullName }: { fullName: string }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="font-dm_sans font-bold text-siteHeadingDark/25">
        BANK TRANSFER
      </span>
      <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
        <p className="flex items-center gap-1">
          <span className="text-siteHeadingDark/50">Bank name</span>
        </p>
        <span className="font-normal uppercase text-siteHeadingDark">
          {bankTransferDetails.bankName}
        </span>
      </div>
      <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
        <p className="flex items-center gap-1">
          <span className="text-siteHeadingDark/50">Account number</span>
        </p>
        <span className="font-normal uppercase text-siteHeadingDark">
          {bankTransferDetails.accountNumber}
        </span>
      </div>
      <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
        <p className="flex items-center gap-1">
          <span className="text-siteHeadingDark/50">Account name</span>
        </p>
        <span className="font-normal uppercase text-siteHeadingDark">
          {bankTransferDetails.accountName + fullName}
        </span>
      </div>

      <span className="mb-2 grid h-[1px] bg-siteHeadingDark/25"></span>
    </div>
  );
}
