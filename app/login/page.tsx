"use client";

import Image from "next/image";
import Link from "next/link";

import { Button, Checkbox, Input } from "@nextui-org/react";
import { getServerSession } from "next-auth";
import { redirect, useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { loginUser } from "@/utils/services";

type LoginInputs = {
  email: string;
  password: string;
};

function Login() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<LoginInputs>();

  const router = useRouter();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: () => {
      // Invalidate and refetch
      console.log("User Logged in successfully");

      router.push("/dashboard");
    },
  });
  const onSubmit: SubmitHandler<LoginInputs> = (data) => {
    console.log(data, "onSubmit fired");
    mutate(data);
  };
  // const session = await getServerSession();
  // console.log({ session });

  // if (session) {
  //   redirect("/");
  // }
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
          <h1 className="font-syne text-3xl font-bold ">Welcome back</h1>
          <p className=" font-dm_sans text-siteHeadingDark/60 mb-10 ">
            Dont have an account?{" "}
            <Link
              className=" underline text-siteGreen font-medium"
              href="/signup"
            >
              sign up for free
            </Link>
          </p>
          <form action="" className=" w-full flex flex-col gap-5">
            <Input type="email" label="Email" {...register("email")} />
            <Input type="password" label="password" {...register("password")} />

            <Button
              className=" rounded-lg bg-siteGreen text-siteLemon font-bold py-2"
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

export default Login;
