"use client";

import Link from "next/link";
import { FiCopy, FiX } from "react-icons/fi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TRANSFER_METHODS } from "@/constants";
import DepositFormSelect from "@/components/DepositFormSelect";
import { useEffect, useState } from "react";
import clsx from "clsx";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import { createDepositTransaction } from "@/utils/actions/transaction.actions";
import DepositTransCreated from "@/components/DepositTransCreated";

import { NumericFormat } from "react-number-format";
import { convertAmount } from "@/cyptoConverter";
import { debounce, formatToUSD } from "@/utils/services";
import InBoxLoader from "@/components/InBoxLoader";
import { DepositTransactionType } from "@/types";
import copy from "copy-to-clipboard";
import { notify } from "@/components/ReferEarnBox";

const FormSchema = z.object({
  paymentMethod: z.enum(["BTC", "USDT", "ETH"], {
    message: "Invalid payment method",
  }),
  amount: z
    .number({
      message: "Invalid amount",
    })
    .gt(2, { message: "Amount must be greater than 2" }),
});

function Deposit() {
  const [hasCreatedTransaction, setHasCreatedTransaction] = useState(false);
  const [transOBJ, setTransOBJ] = useState<{
    transferMethod: string;
    amountToReceive: number;
    transaction: string;
  } | null>(null);
  const [selectedMethod, setSelectedMethod] = useState<
    null | "BTC" | "USDT" | "ETH"
  >(null);
  const [convertedDisplayAmount, setConvertedDisplayAmount] = useState(0);
  const [isFetching, setIsFetching] = useState(false);
  const [fetchAmount, setFetchAmount] = useState(0);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      paymentMethod: undefined,
      amount: 0,
    },
  });

  const queryClient = useQueryClient();

  const { data: session, status } = useSession();

  const { mutate, isPending } = useMutation({
    mutationFn: createDepositTransaction,
    onError: (error) => {},
    onSuccess: (data) => {
      form.reset();

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

      setHasCreatedTransaction(true);

      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  useEffect(() => {
    const setConvertedAmount = async (
      paymentMethod: "BTC" | "USDT" | "ETH",
      amount: number,
    ) => {
      try {
        setIsFetching(true);
        const result = await convertAmount({ paymentMethod, amount });
        setConvertedDisplayAmount(result as number);
      } catch (error) {
        console.error("Error fetching data:", error);
        setConvertedDisplayAmount(0);
      } finally {
        setIsFetching(false);
      }
    };

    if (selectedMethod !== null && fetchAmount > 0) {
      console.log("fetching data-----------------");
      const { paymentMethod, amount } = form.getValues();
      setConvertedAmount(paymentMethod, amount);
    }
  }, [selectedMethod, form, fetchAmount]);

  const debouncedSetFetchAmount = debounce((amount: number) => {
    setFetchAmount(amount);
  }, 500);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const muParameter = {
      amount: data.amount,
      transferMethod: data.paymentMethod,
      transferFee: 1,
      tax: 0,
      amountToReceive: data.amount - 1,
      userId: session?.user.id!,
    } as DepositTransactionType;
    mutate(muParameter);
  }

  if (isPending) {
    return <InBoxLoader />;
  }

  const resetState = () => {
    setHasCreatedTransaction(false);
    setTransOBJ(null);
  };

  function handleCopy(textToCopy: string) {
    copy(textToCopy);
    notify("Wallet Address copied to clipboard");
  }

  return (
    <>
      {!hasCreatedTransaction && (
        <section className="grid place-items-center">
          <div className="flex w-full max-w-[800px] flex-col gap-5 rounded-2xl p-0 md:p-6 lg:border">
            <div className="flex items-center justify-between font-syne text-2xl font-semibold md:text-3xl">
              <span className="text-siteGreen">Deposit</span>
              <Link href="/dashboard">
                <FiX />
              </Link>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative flex w-full flex-col gap-5"
              >
                <FormField
                  control={form.control}
                  name="paymentMethod"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-2 text-sm font-semibold uppercase text-siteHeadingDark">
                        Payment Method
                      </FormLabel>
                      <Select
                        onValueChange={(value) => {
                          if (
                            value === "BTC" ||
                            value === "USDT" ||
                            value === "ETH"
                          ) {
                            setSelectedMethod(value);
                          }
                          field.onChange(value);
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="rounded-2xl border bg-gray-100/50 p-4 py-8 text-medium font-semibold text-siteText md:text-2xl">
                            <SelectValue
                              className="text-sm font-semibold text-siteText placeholder-shown:text-sm md:text-2xl"
                              placeholder="Select a payment method from the dropdown"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="">
                          {TRANSFER_METHODS.map((method) => (
                            <SelectItem
                              className="my-1"
                              key={method.key}
                              value={method.key}
                            >
                              <DepositFormSelect method={method} />
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="amount"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="ml-2 text-sm font-semibold uppercase text-siteHeadingDark">
                        Amount
                      </FormLabel>

                      <FormControl>
                        <div className="flex items-end gap-[2px] rounded-2xl border bg-gray-100/50 p-4">
                          <NumericFormat
                            className="!m-0 border-none bg-transparent p-0 text-lg font-semibold text-siteText shadow-none focus-within:ring-0 focus-visible:border-0 focus-visible:outline-none focus-visible:ring-0 active:border-none md:text-2xl"
                            thousandSeparator
                            prefix="$"
                            placeholder="0.00"
                            allowLeadingZeros={false}
                            onValueChange={(value) => {
                              console.log(value);

                              field.onChange(+value?.floatValue!);
                              debouncedSetFetchAmount(+value?.floatValue!);
                            }}
                          />
                        </div>
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex w-full flex-col gap-2">
                  <span className="ml-2 text-sm font-semibold uppercase text-siteHeadingDark">
                    Address
                  </span>
                  <div className="flex flex-col items-start justify-between gap-5 rounded-2xl border bg-gray-100/50 p-4 py-4 text-lg font-semibold text-siteText md:flex-row md:items-center md:text-2xl">
                    <span className=" ">
                      {selectedMethod !== null && convertedDisplayAmount ? (
                        <span className="break-all">
                          {
                            TRANSFER_METHODS.find(
                              (method) => method.key === selectedMethod,
                            )?.depositAddress
                          }
                        </span>
                      ) : (
                        <span className="text-wrap">
                          Select a payment method to view address
                        </span>
                      )}
                    </span>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        handleCopy(
                          TRANSFER_METHODS.find(
                            (method) => method.key === selectedMethod,
                          )?.depositAddress!,
                        );
                      }}
                      disabled={!selectedMethod && !convertedDisplayAmount}
                      className={clsx(
                        "hidden p-1 md:block",
                        !selectedMethod
                          ? "cursor-not-allowed text-siteText opacity-50"
                          : "text-siteGreen",
                      )}
                    >
                      <FiCopy />
                    </button>
                    <button
                      disabled={!selectedMethod}
                      className={clsx(
                        "flex w-full items-center justify-between gap-2 rounded-lg border p-3 md:hidden",
                        !selectedMethod
                          ? "cursor-not-allowed text-siteText opacity-50"
                          : "bg-siteGreen p-2 text-white hover:bg-siteOrange hover:text-black",
                      )}
                    >
                      <span className="text-medium uppercase">
                        Copy Address
                      </span>
                      <span className="text-xl">
                        <FiCopy />
                      </span>
                    </button>
                  </div>
                </div>
                <div className="flex w-full flex-col gap-2">
                  <span className="ml-2 text-sm font-semibold uppercase text-siteHeadingDark">
                    Summary
                  </span>
                  <div className="flex flex-col items-center gap-3 rounded-2xl border bg-gray-100/50 p-4 text-2xl font-semibold text-siteText">
                    <div className="flex w-full items-center justify-between">
                      <span className="text-medium font-normal md:text-xl">
                        Deposit Amount
                      </span>
                      <span className="text-medium text-siteHeadingDark md:text-xl">
                        {formatToUSD(fetchAmount)}
                      </span>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <span className="text-medium font-normal md:text-xl">
                        Current Value
                      </span>
                      <div className="text-medium text-siteHeadingDark md:text-xl">
                        {selectedMethod && fetchAmount > 0 ? (
                          <span className="">{`${convertedDisplayAmount}(${selectedMethod})`}</span>
                        ) : (
                          <span className="">N/A</span>
                        )}
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <span className="text-medium font-normal md:text-xl">
                        Fee
                      </span>
                      <span className="text-medium text-siteHeadingDark md:text-xl">
                        $1.00
                      </span>
                    </div>
                    <div className="flex w-full items-center justify-between">
                      <span className="text-medium font-normal md:text-xl">
                        Expected deposit
                      </span>
                      <div className="text-medium text-siteHeadingDark md:text-xl">
                        {selectedMethod && fetchAmount > 0 ? (
                          <span className="">
                            {formatToUSD(fetchAmount - 1)}
                          </span>
                        ) : (
                          <span className="">N/A</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <Button
                  className="rounded-2xl border bg-siteGreen p-4 py-6 font-archivo text-lg font-semibold text-white hover:bg-siteOrange hover:text-black md:py-8 md:text-2xl"
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </section>
      )}

      {hasCreatedTransaction && transOBJ && (
        <DepositTransCreated transOBJ={transOBJ} resetState={resetState} />
      )}
    </>
  );
}

export default Deposit;
