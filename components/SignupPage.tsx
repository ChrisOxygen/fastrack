"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Button, Checkbox, Input } from "@nextui-org/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { signupNewUser } from "@/utils/services";
// import { signupNewUser } from "@/utils/actions/user.actions";

type SignupInputs = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  privacyPolicy: boolean;
  hasReferralCode?: boolean;
  referralCode?: string;
};

function SignupPage() {
  const [formLoading, setFormLoading] = useState(false);
  const params = useParams<{ referralcode: string }>();

  const router = useRouter();

  const hasCode = params.referralcode ? true : false;

  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setError,

    formState: { errors, isValidating, isSubmitting, isLoading },
  } = useForm<SignupInputs>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      privacyPolicy: false,
      hasReferralCode: hasCode,
      referralCode: params.referralcode || "",
    },
  });

  const { mutate, error, data } = useMutation({
    mutationFn: signupNewUser,
    onSuccess: () => {
      // Invalidate and refetch
      console.log("User created successfully");

      router.push("/login");
    },
    onError: (error) => {
      console.log(error, "error");
      setError("email", {
        type: "validate",
        message: error.message,
      });
    },
  });

  useEffect(() => {
    if (isValidating || isSubmitting || isLoading) {
      setFormLoading(true);
    } else {
      setFormLoading(false);
    }
  }, [isValidating, isSubmitting, isLoading]);

  const onSubmit: SubmitHandler<SignupInputs> = (data) => {
    console.log(data, "onSubmit fired");

    const { confirmPassword, ...rest } = data;

    mutate(rest);
  };

  return (
    <main
      className="relative flex h-screen overflow-hidden bg-siteBg bg-cover bg-fixed bg-center"
      style={{
        backgroundImage: "url('/Lines-No-Background.png')",
      }}
    >
      <span className="absolute bottom-0 left-0 right-0 top-0 z-[2] bg-siteBg opacity-95"></span>
      <div className="relative z-10 flex w-full max-w-[700px] flex-col items-start justify-between bg-white p-7">
        <Link
          href="/"
          className="flex gap-2 text-center font-syne text-xl font-bold"
        >
          <Image
            src="/fastrack-green.png"
            alt="Kudizen"
            width={150}
            height={10}
          />
        </Link>
        <div className="flex w-full flex-col items-start md:p-16">
          <h1 className="font-syne text-3xl font-bold">Create an account</h1>
          <p className="mb-10 font-dm_sans text-siteHeadingDark/60">
            Already have an account?{" "}
            <Link
              className="font-medium text-siteGreen underline"
              href="/login"
            >
              Log in
            </Link>
          </p>
          <form className="flex w-full flex-col gap-5">
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                label="First Name"
                className={`${
                  errors.firstName && "rounded-xl border border-red-600"
                }`}
                {...register("firstName", {
                  required: "Field cannot be blank",
                })}
              />
              {errors.firstName && (
                <span className="mr-2 self-end font-dm_sans text-sm text-red-600">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                type="text"
                label="Last Name"
                className={`${
                  errors.lastName && "rounded-xl border border-red-600"
                }`}
                {...register("lastName", {
                  required: "Field cannot be blank",
                  disabled: formLoading,
                })}
              />
              {errors.lastName && (
                <span className="mr-2 self-end font-dm_sans text-sm text-red-600">
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                type="email"
                label="Email"
                className={`${
                  errors.email && "rounded-xl border border-red-600"
                }`}
                {...register("email", {
                  required: "Field cannot be blank",
                  disabled: formLoading,
                })}
              />
              {errors.email && (
                <span className="mr-2 self-end font-dm_sans text-sm text-red-600">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1">
              <Input
                type="password"
                label="password"
                className={`${
                  errors.password && "rounded-xl border border-red-600"
                }`}
                {...register("password", {
                  required: "Field cannot be blank",
                  disabled: formLoading,
                })}
              />
              {errors.password && (
                <span className="mr-2 self-end font-dm_sans text-sm text-red-600">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Input
                type="password"
                label="confirm password"
                className={`${
                  errors.confirmPassword && "rounded-xl border border-red-600"
                }`}
                {...register("confirmPassword", {
                  required: "Field cannot be blank",
                  disabled: formLoading,
                  validate: (v) =>
                    v === getValues("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="mr-2 self-end font-dm_sans text-sm text-red-600">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-2">
              <Checkbox
                defaultSelected={hasCode}
                {...register("hasReferralCode")}
              >
                {" "}
                I have a referral code.
              </Checkbox>
              {watch("hasReferralCode") === true && (
                <input
                  type="text"
                  className="w-full rounded-lg bg-gray-100 px-3 py-3 font-dm_sans text-2xl font-extrabold uppercase text-gray-500"
                  {...register("referralCode", {
                    disabled: formLoading || !watch("hasReferralCode"),
                    value: params.referralcode || "",
                  })}
                />
              )}
            </div>

            <Checkbox {...register("privacyPolicy")}>
              {" "}
              I agree with Privacy & Policy and Terms & Condition
            </Checkbox>

            {watch("privacyPolicy") === false && (
              <Button
                disabled
                className="rounded-lg bg-gray-400 py-2 font-bold text-black/40"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(onSubmit)();
                }}
              >
                Sign up
              </Button>
            )}

            {watch("privacyPolicy") === true && (
              <Button
                className="rounded-lg bg-siteGreen py-2 font-bold text-siteLemon"
                onClick={(e) => {
                  e.preventDefault();
                  handleSubmit(onSubmit)();
                }}
              >
                Sign up
              </Button>
            )}
          </form>
        </div>
        <span className="">Kudizen 2024 all rights reserved</span>
      </div>
    </main>
  );
}

export default SignupPage;
