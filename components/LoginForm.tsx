"use client";

import Image from "next/image";
import Link from "next/link";

import { Button, Input } from "@nextui-org/react";
import { redirect, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useSession } from "next-auth/react";
import { loginUser } from "@/utils/services";
// import { loginUser } from "@/utils/actions/user.actions";

type LoginInputs = {
  email: string;
  password: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginInputs>();

  const queryClient = useQueryClient();

  const { data: session } = useSession();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      redirect("/dashboard");
    },
    onError: (error) => {
      if (
        error.message === "Invalid password" ||
        error.message === "user not found"
      ) {
        setError("root", { message: "Invalid Cridentials" });
      }
    },
  });
  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    mutate(data);
  };

  if (session) {
    redirect("/dashboard");
  }

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
          <h1 className="font-syne text-3xl font-bold">Welcome back</h1>
          <p className="mb-10 font-dm_sans text-siteHeadingDark/60">
            Dont have an account?{" "}
            <Link
              className="font-medium text-siteGreen underline"
              href="/signup"
            >
              sign up for free
            </Link>
          </p>
          <form action="" className="flex w-full flex-col gap-5">
            <Input type="email" label="Email" {...register("email")} />
            <Input type="password" label="password" {...register("password")} />
            {errors?.root && (
              <span className="text-red-500">
                {errors.root && errors.root.message}
              </span>
            )}

            <Button
              className="rounded-lg bg-siteGreen py-2 font-bold text-siteLemon"
              onClick={(e) => {
                e.preventDefault();
                handleSubmit(onSubmit)();
              }}
            >
              Sign in
            </Button>
          </form>
        </div>
        <span className="">Kudizen 2024 all rights reserved</span>
      </div>
    </main>
  );
}

export default LoginForm;
