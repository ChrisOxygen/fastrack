"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";

import BtnLoadSpinner from "@/components/BtnLoadSpinner";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import CustomButton from "@/components/ui/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { SignInDetails } from "@/types";
import {
  sendPasswordResetEmail,
  signInUser,
} from "@/utils/actions/user.actions";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

const formSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
});

function ForgotPassword() {
  const [passwordRestEmailSent, setPasswordRestEmailSent] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (email: string) => {
      return sendPasswordResetEmail(email);
    },
    onSuccess: () => {
      setPasswordRestEmailSent(true);
    },
    onError: (error) => {
      // An error happened!
      console.log("error name", error);
      form.setError("root" as "email" | "root", {
        type: "manual",
        message: error.message,
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    mutate(values.email);
  }

  const loading =
    form.formState.isSubmitting || form.formState.isValidating || isPending;
  return (
    <div className="flex w-full flex-col gap-2">
      {passwordRestEmailSent ? (
        <div className="flex flex-col items-center gap-4">
          <DotLottieReact
            src="https://lottie.host/dd62eaf7-0f43-4390-b9a5-48b92d7f9a07/voJRKtHsX5.lottie"
            autoplay
          />
          <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
            Password Reset Link Sent
          </h2>
          <p className="-mt-3 max-w-[400px] text-center text-siteText">
            We&apos;ve sent a password reset link to your email address. Please
            check your email.
          </p>
        </div>
      ) : (
        <>
          <h2 className="text-4xl font-thin text-siteGreen">Reset Password</h2>
          <p className="mb-6 text-siteText">
            Enter the email address associated with your account, and we’ll
            email you a link to reset your password.
          </p>
          <Form {...form}>
            <form
              className="flex flex-col gap-5"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit(onSubmit)();
              }}
            >
              <>
                <div className="flex flex-col gap-4">
                  <FormLabel>Email</FormLabel>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="border-0 bg-siteGreen/10 py-[26px] text-lg outline-siteGreen focus:outline-siteGreen focus-visible:outline active:outline"
                            type=" email"
                            placeholder="Email"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </>

              <CustomButton
                text={
                  <div className="flex items-center justify-center gap-3">
                    Send reset link
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
            <Link href="/forgot-password" className="text-siteGreen">
              Forgot password?
            </Link>
          </Form>
        </>
      )}
    </div>
  );
}

export default ForgotPassword;
