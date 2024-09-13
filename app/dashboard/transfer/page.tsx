"use client";

import { Reducer, useEffect, useReducer, useState } from "react";
import { SubmitHandler, useForm, ValidateResult } from "react-hook-form";
import { FiX } from "react-icons/fi";
import { Spinner } from "@nextui-org/react";
import { BiCheckDouble } from "react-icons/bi";
import { initiateFundsTransfer, validateEmail } from "@/utils/services";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useFetchUserData from "@/hooks/useFetchUserData";
import { set } from "mongoose";
import TransactionSuccess from "@/components/TransactionSuccess";
import ConfirmTransaction from "@/components/ConfirmTransaction";

type FormInputs = {
  reciverEmail: string;
  amount: number;
  note: string;
};

type InitialStateType = {
  step: number;
  loading: boolean;
  taxPecentage: number;
  inputData: {
    hasValidated: boolean;
    values: {
      reciverEmail: string;
      amount: number;
      note: string;
      tax: number;
      amountToReceive: number;
    };
  };
};

type ReducerActionType = {
  type: string;
  payLoad?: any;
};

const initialState: InitialStateType = {
  step: 1,
  loading: false,
  taxPecentage: 0.03,

  inputData: {
    hasValidated: false,
    values: {
      reciverEmail: "",
      amount: 0.0,
      note: "",
      tax: 0,
      amountToReceive: 0,
    },
  },
};

function reducer(state: InitialStateType, action: ReducerActionType) {
  switch (action.type) {
    case "setStep":
      return { ...state, step: action.payLoad };

    case "setInputData":
      return {
        ...state,
        inputData: { ...state.inputData, values: action.payLoad },
      };
    case "reset":
      return { ...initialState };

    default:
      throw new Error("unknown action");
  }
}

function Transfer() {
  const [state, dispatch] = useReducer<
    Reducer<InitialStateType, ReducerActionType>
  >(reducer, initialState);
  const { step, loading, taxPecentage, inputData } = state;

  const { session } = useFetchUserData();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => {
      return initiateFundsTransfer(inputData.values, session?.user.id!);
    },
    onError: (error) => {
      console.log("error in useQuery", error);
      const { message, field } = error as any;
      setError(field, { message });
      setStep(1);
    },
    onSuccess: (data) => {
      setStep(3);
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
    setValue,

    setError,
    formState: { errors },
  } = useForm({
    defaultValues: inputData.values,
  });

  function handleNextStep() {
    console.log("clicked next");
    handleSubmit(onSubmit)();
  }

  function setStep(step: number) {
    dispatch({ type: "setStep", payLoad: step });
  }

  function resetState() {
    dispatch({ type: "reset" });
  }

  const submitAfterConfirmation = async () => {
    console.log("submitting");

    mutate();
  };

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log(data);
    dispatch({ type: "setInputData", payLoad: data });
    setStep(2);

    // submitAfterConfirmation();
  };

  const deductable = +watch("amount") - getValues("tax");

  if (watch("amount")) {
    setValue("amountToReceive", +watch("amount") - getValues("tax"));
  }
  return (
    <section className="flex flex-col gap-16">
      <div
        className="relative grid h-full grid-cols-[50px_1fr_50px] items-center justify-between rounded-2xl bg-siteGreen bg-cover bg-left bg-no-repeat px-7 py-6 before:absolute before:left-0 before:top-0 before:h-full before:w-full before:rounded-2xl before:bg-siteGreen/50"
        style={{
          backgroundImage: "url('/Lines-No-Background-white.png')",
        }}
      >
        <div className="relative z-10 col-span-1 col-start-2 flex justify-center gap-2">
          <div className="flex flex-col items-center gap-1">
            <span className="h-3 w-3 rounded-full border-4 border-siteLemon"></span>
            <span className="font-dm_sans font-bold text-white">Step 1</span>
          </div>
          <span
            className={`mt-1 h-1 w-[100px] rounded-lg ${
              step >= 2 && "bg-siteLemon"
            } ${step === 1 && "bg-white"}`}
          ></span>
          <div className="flex flex-col items-center gap-1">
            <span
              className={`h-3 w-3 rounded-full border-4 ${
                step >= 2 && "border-siteLemon"
              } ${step === 1 && "border-white"}`}
            ></span>
            <span className="font-dm_sans font-bold text-white">Step 2</span>
          </div>
          <span
            className={`mt-1 h-1 w-[100px] rounded-lg ${
              step >= 3 && "bg-siteLemon"
            } ${step <= 2 && "bg-white"}`}
          ></span>
          <div className="flex flex-col items-center gap-1">
            <span
              className={`h-3 w-3 rounded-full border-4 ${
                step >= 3 && "border-siteLemon"
              } ${step <= 2 && "border-white"}`}
            ></span>
            <span className="font-dm_sans font-bold text-white">Step 3</span>
          </div>
        </div>
        <button className="z-10 grid h-6 w-6 place-items-center rounded-lg bg-white text-2xl shadow">
          <FiX />
        </button>
      </div>

      {step === 1 && (
        <div className="mx-auto flex w-full max-w-[700px] flex-col">
          <form className="flex w-full flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="font-dm_sans font-bold text-siteHeadingDark"
              >
                Enter User Email
              </label>
              <div className="flex items-stretch overflow-hidden rounded-xl border border-siteHeadingDark/25">
                <input
                  type="email"
                  id=""
                  className="w-full px-3 py-2 font-dm_sans text-2xl font-semibold focus:border-none focus:outline-none active:border-none active:outline-none"
                  {...register("reciverEmail", {
                    required: true,
                  })}
                />
              </div>
              {errors?.reciverEmail && (
                <span className="">{errors?.reciverEmail.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="font-dm_sans font-bold text-siteHeadingDark"
              >
                Amount to send
              </label>
              <div className="flex items-stretch overflow-hidden rounded-xl border border-siteHeadingDark/25">
                <input
                  type="number"
                  id=""
                  className="w-full px-3 py-2 font-dm_sans text-3xl font-semibold [appearance:textfield] focus:border-none focus:outline-none active:border-none active:outline-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  {...register("amount", {
                    required: true,
                    valueAsNumber: true,
                    min: {
                      value: 0.01,
                      message: "Amount must be greater than 0",
                    },
                    onChange: () => {
                      setValue(
                        "tax",
                        +(watch("amount") * taxPecentage).toFixed(2),
                      );
                    },
                  })}
                />
                <div className="grid place-items-center self-stretch bg-siteHeadingDark/25 px-3 font-dm_sans text-3xl text-gray-700/30">
                  <span className=" ">USD</span>
                </div>
              </div>
              {errors?.amount && (
                <span className="">{errors?.amount?.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label
                htmlFor=""
                className="font-dm_sans font-bold text-siteHeadingDark"
              >
                Send Money Note (Optional)
              </label>
              <div className="flex items-stretch overflow-hidden rounded-xl border border-siteHeadingDark/25">
                <textarea
                  {...register("note")}
                  id=""
                  rows={4}
                  className="h-full w-full px-3 py-2 focus:border-none focus:outline-none active:border-none active:outline-none"
                ></textarea>
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
                {...register("amountToReceive", {
                  value: deductable,
                })}
              />
            </div>

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
                    <span className="">FREE</span>
                  </div>
                  <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
                    <p className="flex items-center gap-1">
                      <span className="h-2 w-2 rounded-full bg-green-700"></span>
                      <span className="text-siteHeadingDark/50">Tax</span>
                    </p>
                    <span className="">
                      {watch("tax")} USD(
                      {taxPecentage}%)
                    </span>
                  </div>
                </div>
                <span className="grid h-[1px] bg-siteHeadingDark/25"></span>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
                    <p className="flex items-center gap-1">
                      <span className="">DEDUCTABLE</span>
                    </p>
                    <span className="">{deductable} USD</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              className="w-full rounded-xl bg-siteGreen p-4 font-dm_sans font-bold text-white"
              onClick={function (e) {
                console.log("clicked");
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
          transactionType="transfer"
        />
      )}
      {step === 3 && <TransactionSuccess reset={resetState} />}
    </section>
  );
}

export default Transfer;
