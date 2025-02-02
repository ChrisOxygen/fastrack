"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";

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
import { signupNewUser } from "@/utils/actions/user.actions";

const signUpFormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Invalid email address.",
    }),
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

function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [hasRegistered, setHasRegistered] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<z.infer<typeof signUpFormSchema>>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    },
  });

  const { mutate, isPending, isError } = useMutation({
    mutationFn: (values: z.infer<typeof signUpFormSchema>) => {
      return signupNewUser(values);
    },
    onError: (error) => {
      form.setError("root", { message: error.message });
    },
    onSuccess: (data) => {
      setHasRegistered(true);
    },
  });

  function onSubmit(values: z.infer<typeof signUpFormSchema>) {
    console.log(values);
    mutate(values);
  }

  const loading =
    form.formState.isSubmitting || form.formState.isValidating || isPending;
  return (
    <>
      {hasRegistered ? (
        <RegistrationSuccessful />
      ) : (
        <div className="flex w-full flex-col gap-2">
          <h2 className="text-4xl font-thin text-siteGreen">
            Create an Accout
          </h2>
          <p className="mb-6 text-siteText">
            Do you already have an account?{" "}
            <Link className="text-siteGreen" href={"/login"}>
              Log in
            </Link>{" "}
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
                  <FormLabel htmlFor="firstName">First Name</FormLabel>
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="border-0 bg-siteGreen/10 py-[26px] text-lg outline-siteGreen focus:outline-siteGreen focus-visible:outline active:outline"
                            type="text"
                            placeholder="First Name"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <FormLabel htmlFor="lastName">Last Name</FormLabel>
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            className="border-0 bg-siteGreen/10 py-[26px] text-lg outline-siteGreen focus:outline-siteGreen focus-visible:outline active:outline"
                            type="text"
                            placeholder="Last Name"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <FormLabel htmlFor="email">Email</FormLabel>

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
                          {showPassword ? (
                            <HiOutlineEyeOff />
                          ) : (
                            <HiOutlineEye />
                          )}
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
                          {showPassword ? (
                            <HiOutlineEyeOff />
                          ) : (
                            <HiOutlineEye />
                          )}
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
                    Create an account
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
            <p className="">
              By continuing, you agree to the{" "}
              <Link
                href="/privacy-policy"
                className="font-semibold text-siteGreen underline"
              >
                Fastrack Privacy Policy
              </Link>
              .
            </p>
          </Form>
        </div>
      )}
    </>
  );
}

export default SignUpPage;

function RegistrationSuccessful() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <DotLottieReact
        src="https://lottie.host/c6625faa-a53c-4005-8015-d2e6a8557cc1/p3bL4JtiVI.lottie"
        autoplay
      />
      <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
        Registration Successful
      </h2>
      <p className="-mt-3 max-w-[400px] text-center text-siteText">
        Your account has been created successfully. Please check your email to
        verify your account.
      </p>
    </div>
  );
}
