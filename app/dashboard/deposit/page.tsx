"use client";

import { Reducer, useReducer } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import useFetchUserData from "@/hooks/useFetchUserData";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { initiateCyptoDeposit } from "@/utils/services";
import LoadingSpinner from "@/components/LoadingSpinner";
import StepDisplay from "@/components/StepDisplay";

import clsx from "clsx";

import DepositTransCreated from "@/components/DepositTransCreated";

const transferMethods = [
  {
    id: 1,
    key: "BTC",
    label: "BTC",
    depositAddress: "bc1q2tv7y6ftyc4tcecm7lmn0rq0vlp4eps66qhrzt",
    network: "Not Reqiured",
  },

  {
    id: 3,
    key: "USDT",
    label: "USDT",

    depositAddress: "TRyXWCrXpiTi3a3JDgfoXVFZNKT5XYQrY2",
    network: "TRC20",
  },
];

export type CyptoTransferMethodType = "BTC" | "USDT" | null;

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

type InitialStateType = {
  step: number;
  loading: boolean;
  transferFee: number;
  taxPecentage: number;
  transferMethod: CyptoTransferMethodType;
  inputData: {
    amount: number;
    transferMethod: CyptoTransferMethodType;
    transferFee: number;
    amountToReceive: number;
  };
  transOBJ: mutationReturnType | null;
};

type ReducerActionType = {
  type: string;
  payLoad?: any;
};

const initialState: InitialStateType = {
  step: 1,
  loading: false,
  transferFee: 1, //$1
  taxPecentage: 0.02,
  transferMethod: null,

  inputData: {
    amount: 0.0,
    transferMethod: null,
    transferFee: 1,
    amountToReceive: 0,
  },

  transOBJ: null,
};

function reducer(state: InitialStateType, action: ReducerActionType) {
  switch (action.type) {
    case "nextStep":
      return { ...state, step: state.step++ };

    case "setInputData":
      return {
        ...state,
        inputData: action.payLoad,
      };

    case "setTransferMethod":
      return { ...state, transferMethod: action.payLoad };

    case "setTransOBJ":
      return { ...state, transOBJ: action.payLoad };

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
  const { step, transferFee, transferMethod, inputData, transOBJ } = state;

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: () => {
      return initiateCyptoDeposit({ ...inputData, tax: 0 }, session?.user.id!);
    },
    onError: (error) => {
      console.log("error", error);
    },
    onSuccess: (data) => {
      console.log("data", data);
      const { message, transaction } = data as mutationReturnType;
      if (message === "New deposite transaction created") {
        dispatch({
          type: "setTransOBJ",
          payLoad: data,
        });

        setStep();
      }

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const { status, session } = useFetchUserData();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors, isLoading, isSubmitting, isValidating },
  } = useForm<FormInputs>({});

  console.log("tm", watch("transferMethod"));

  watch("transferMethod") !== null &&
    watch("transferMethod") !== undefined &&
    setValue("transferFee", transferFee);

  +watch("amount") > 0 &&
    setValue("amountToReceive", +watch("amount") - transferFee);

  function handleNextStep() {
    console.log(" continue clicked");
    handleSubmit(onSubmit)();
  }

  function resetState() {
    dispatch({ type: "reset" });
  }

  function setStep() {
    console.log("setStep");
    dispatch({ type: "nextStep" });
  }

  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    console.log("onsubmit", data);

    dispatch({ type: "setInputData", payLoad: data });

    setStep();
    mutate();
  };

  if (
    status === "pending" ||
    isLoading ||
    isSubmitting ||
    isValidating ||
    isPending
  ) {
    return <LoadingSpinner />;
  }

  console.log("transOBJ", transOBJ, "step", step);

  return (
    <>
      <section className="mt-16 flex flex-col gap-16 sm:mt-0">
        <StepDisplay step={step} />

        {(step === 1 || step === 2) && (
          <div className="flex w-full flex-col items-center">
            <form
              onSubmit={(e) => e.preventDefault()}
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
                    {...register("amount", { required: true })}
                    placeholder="0.00"
                    className="inputField py-3 font-dm_sans text-6xl font-bold text-siteHeadingDark placeholder-shown:text-siteHeadingDark/10 focus:border-0 focus:outline-none active:border-0 active:outline-none"
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
                      dispatch({ type: "setTransferMethod", payLoad: "BTC" });
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
                      dispatch({ type: "setTransferMethod", payLoad: "USDT" });
                    }}
                  >
                    USDT
                  </button>
                </div>
              </div>
              <button
                disabled={transferMethod === null}
                className={clsx(
                  "w-full rounded-xl bg-siteHeadingDark py-5 font-dm_sans text-xl text-white",
                  transferMethod === null && "cursor-not-allowed opacity-50",
                )}
                onClick={handleNextStep}
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
                hace 24 hours to make the payment. if you fail to make the
                payment within the stipulated time, the transaction will be
                cancelled and you will have to create a new transaction.
              </p>
            </div>
          </div>
        )}

        {step === 3 && transOBJ && <DepositTransCreated transOBJ={transOBJ} />}
      </section>
    </>
  );
}

export default Deposit;
