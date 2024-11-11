"use client";

import { useParams, useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInvestment } from "@/utils/actions/investment.actions";
import { InvestmentTransactionType } from "@/types";
import useFetchUserData from "@/hooks/useFetchUserData";
import { INVESTMENT_PLANS } from "@/constants";
import { formatToUSD } from "@/utils/services";
import { set } from "mongoose";

const formSchema = z
  .object({
    investmentPackage: z.enum(["sapphire", "emerald", "diamond"]),
    amount: z.coerce.number(),
  })
  .refine(
    (data) => {
      const { investmentPackage, amount } = data;

      if (investmentPackage === "sapphire" && amount < 100) {
        return false;
      }

      if (investmentPackage === "emerald" && amount < 5000) {
        return false;
      }

      if (investmentPackage === "diamond" && amount < 20000) {
        return false;
      }

      return true;
    },
    {
      message:
        "Amount does not meet the minimum requirement for the selected investment package",
      path: ["amount"],
    },
  );

function CreateInvestment() {
  const { session, status } = useFetchUserData();
  const { ivPackage } = useParams<{
    ivPackage: "sapphire" | "emerald" | "diamond";
  }>();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: InvestmentTransactionType) => {
      return createInvestment(formData);
    },
    onError: (error) => {
      if (error && error.message === "Insufficient balance") {
        form.setError("amount", {
          message: "Insufficient balance",
        });
        return;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/dashboard/investment");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      investmentPackage: ivPackage
        ? (ivPackage as "sapphire" | "emerald" | "diamond")
        : undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);

    const investmentDetails: InvestmentTransactionType = {
      ...values,
      userId: session?.user.id!,
      status: "success",
      fee: 0,
      type: "investment",
    };

    mutate(investmentDetails);
  }

  if (!["sapphire", "emerald", "diamond"].includes(ivPackage)) {
    return router.push("/dashboard/investment");
  }

  if (status === "pending") {
    return <div>Loading...</div>;
  }

  const getMinimumAmount = (packageName: string) => {
    return packageName === "sapphire"
      ? formatToUSD(100)
      : packageName === "emerald"
        ? formatToUSD(5000)
        : formatToUSD(20000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="investmentPackage"
          render={({ field }) => (
            <FormItem>
              <FormLabel>InvestMent Package</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an InvestMent Package" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="sapphire">sapphire</SelectItem>
                  <SelectItem value="emerald">emerald</SelectItem>
                  <SelectItem value="diamond">diamond</SelectItem>
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
              <FormLabel>amount to invest</FormLabel>
              <FormControl>
                <Input placeholder="50" {...field} />
              </FormControl>
              <FormDescription>
                Enter the amount you wish to invest.{" "}
                {getMinimumAmount(form.watch("investmentPackage"))} minimum
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

export default CreateInvestment;
