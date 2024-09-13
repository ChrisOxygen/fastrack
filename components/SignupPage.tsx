"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

import { Button, Checkbox, Input } from "@nextui-org/react";

import { useForm, SubmitHandler } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { signupNewUser } from "@/utils/services";
import { useParams, useRouter } from "next/navigation";

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
      className=" bg-siteBg h-screen overflow-hidden relative bg-fixed bg-cover bg-center flex"
      style={{
        backgroundImage: "url('/Lines-No-Background.png')",
      }}
    >
      <span className=" z-[2] absolute top-0 left-0 right-0 bottom-0  bg-siteBg opacity-95 "></span>
      <div className="relative w-full max-w-[700px] z-10 bg-white flex flex-col items-start  p-7 justify-between">
        <Link
          href="/"
          className="flex text-center font-syne font-bold text-xl gap-2 "
        >
          <Image src="/kudizen-icon.png" alt="Kudizen" width={30} height={30} />
          <h6 className="">Kudizen</h6>
        </Link>
        <div className="w-full flex flex-col items-start md:p-16">
          <h1 className="font-syne text-3xl font-bold ">Create an account</h1>
          <p className=" font-dm_sans text-siteHeadingDark/60 mb-10 ">
            Already have an account?{" "}
            <Link
              className=" underline text-siteGreen font-medium"
              href="/login"
            >
              Log in
            </Link>
          </p>
          <form className=" w-full flex flex-col gap-5">
            <div className="flex flex-col gap-1 ">
              <Input
                type="text"
                label="First Name"
                className={`${
                  errors.firstName && "border-red-600 border rounded-xl"
                }`}
                {...register("firstName", {
                  required: "Field cannot be blank",
                })}
              />
              {errors.firstName && (
                <span className="text-sm font-dm_sans text-red-600 self-end mr-2">
                  {errors.firstName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 ">
              <Input
                type="text"
                label="Last Name"
                className={`${
                  errors.lastName && "border-red-600 border rounded-xl"
                }`}
                {...register("lastName", {
                  required: "Field cannot be blank",
                  disabled: formLoading,
                })}
              />
              {errors.lastName && (
                <span className="text-sm font-dm_sans text-red-600 self-end mr-2">
                  {errors.lastName.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 ">
              <Input
                type="email"
                label="Email"
                className={`${
                  errors.email && "border-red-600 border rounded-xl"
                }`}
                {...register("email", {
                  required: "Field cannot be blank",
                  disabled: formLoading,
                })}
              />
              {errors.email && (
                <span className="text-sm font-dm_sans text-red-600 self-end mr-2">
                  {errors.email.message}
                </span>
              )}
            </div>
            <div className="flex flex-col gap-1 ">
              <Input
                type="password"
                label="password"
                className={`${
                  errors.password && "border-red-600 border rounded-xl"
                }`}
                {...register("password", {
                  required: "Field cannot be blank",
                  disabled: formLoading,
                })}
              />
              {errors.password && (
                <span className="text-sm font-dm_sans text-red-600 self-end mr-2">
                  {errors.password.message}
                </span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <Input
                type="password"
                label="confirm password"
                className={`${
                  errors.confirmPassword && "border-red-600 border rounded-xl"
                }`}
                {...register("confirmPassword", {
                  required: "Field cannot be blank",
                  disabled: formLoading,
                  validate: (v) =>
                    v === getValues("password") || "Passwords do not match",
                })}
              />
              {errors.confirmPassword && (
                <span className="text-sm font-dm_sans text-red-600 self-end mr-2">
                  {errors.confirmPassword.message}
                </span>
              )}
            </div>

            <div className=" flex flex-col gap-2">
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
                  className=" font-dm_sans uppercase font-extrabold text-2xl rounded-lg w-full px-3 py-3 bg-gray-100 text-gray-500"
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
                className=" rounded-lg bg-gray-400 text-black/40 font-bold py-2"
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
                className=" rounded-lg bg-siteGreen text-siteLemon font-bold py-2"
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
