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

const formSchema = z.object({
  transactionTier: z.enum(["silver", "gold"]),
  amount: z.coerce.number().min(50).lt(100),
});

function CreateInvestment() {
  const { session, status } = useFetchUserData();
  const { investmentTier } = useParams();
  const router = useRouter();

  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData: InvestmentTransactionType) => {
      return createInvestment(formData);
    },
    onError: (error) => {},
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/dashboard/investment");
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      transactionTier: investmentTier
        ? (investmentTier as "silver" | "gold")
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

  console.log(investmentTier);

  if (status === "pending") {
    return <div>Loading...</div>;
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="transactionTier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Transaction Tier</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Transaction Tier" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="silver">silver</SelectItem>
                  <SelectItem value="gold">gold</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
              </FormDescription>
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
                Enter the amount you wish to invest, $50 min.
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
