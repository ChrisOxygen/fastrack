"use client";

import BtnLoadSpinner from "@/components/BtnLoadSpinner";
import CustomButton from "@/components/ui/CustomButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import {
  resetPassword,
  validatePwResetLink,
} from "@/utils/actions/user.actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { CgArrowRight } from "react-icons/cg";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import { z } from "zod";

const formSchema = z
  .object({
    password: z.string().min(5, {
      message: "Password must be at least 5 characters.",
    }),
    confirmPassword: z.string().min(5, {
      message: "Password must be at least 5 characters.",
    }),

    referralCode: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

function ResetPwForm({
  email,
  onPwResetSuccess,
  firstName,
}: {
  email: string;
  onPwResetSuccess: () => void;
  firstName: string;
}) {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const {
    mutate: resetPw,
    isPending,
    isError,
  } = useMutation({
    mutationFn: (values: { email: string; password: string }) => {
      return resetPassword(values);
    },
    onError: (error) => {
      form.setError("root", { message: error.message });
    },
    onSuccess: (data) => {
      console.log("data-----------", data);
      onPwResetSuccess();
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    resetPw({ password: values.password, email: email as string });
  }

  const loading = isPending;
  return (
    <>
      <div className="flex w-full flex-col gap-2">
        <h2 className="text-4xl text-siteGreen">
          Hi, <span className="capitalize">{firstName}</span>
          <br /> Create a new password
        </h2>
        <p className="mb-6 text-siteText">
          Enter and confirm your new password to reset your account password.
        </p>
        <Form {...form}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit(onSubmit)();
            }}
            className="flex flex-col gap-5"
          >
            <>
              <div className="flex flex-col gap-4">
                <FormLabel>Password</FormLabel>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl className="relative block">
                        <Input
                          className="border-0 bg-siteGreen/10 py-[26px] text-lg outline-siteGreen focus:outline-siteGreen focus-visible:outline active:outline"
                          type={showPassword ? "text" : "password"}
                          placeholder="**********"
                          {...field}
                        />
                      </FormControl>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword((prev) => !prev);
                        }}
                        className="absolute bottom-0 right-0 !m-0 grid h-full w-14 place-items-center rounded-lg bg-transparent p-1 text-3xl text-siteGreen/40 hover:text-siteGreen"
                      >
                        {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                      </button>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="flex flex-col gap-4">
                <FormLabel>Confirm Password</FormLabel>
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className="relative">
                      <FormControl className="relative block">
                        <Input
                          className="border-0 bg-siteGreen/10 py-[26px] text-lg outline-siteGreen focus:outline-siteGreen focus-visible:outline active:outline"
                          type={showPassword ? "text" : "password"}
                          placeholder="**********"
                          {...field}
                        />
                      </FormControl>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setShowPassword((prev) => !prev);
                        }}
                        className="absolute bottom-0 right-0 !m-0 grid h-full w-14 place-items-center rounded-lg bg-transparent p-1 text-3xl text-siteGreen/40 hover:text-siteGreen"
                      >
                        {showPassword ? <HiOutlineEyeOff /> : <HiOutlineEye />}
                      </button>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </>

            <CustomButton
              text={
                <div className="flex items-center justify-center gap-3">
                  Reset Password
                  {loading && (
                    <span className="ml-2 text-white/30">
                      <BtnLoadSpinner />
                    </span>
                  )}
                </div>
              }
              disabled={loading}
              bgColor="green"
              textColor="white"
              hoverBgColor="orange"
              isFullWidth={true}
            />
          </form>
          {form.formState.errors?.root && (
            <FormMessage>{form.formState.errors?.root?.message}</FormMessage>
          )}
        </Form>
      </div>
    </>
  );
}

export default ResetPwForm;
