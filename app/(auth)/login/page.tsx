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
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi";
import CustomButton from "@/components/ui/CustomButton";
import { useMutation } from "@tanstack/react-query";
import { SignInDetails } from "@/types";
import { signInUser } from "@/utils/actions/user.actions";
import { useSession } from "next-auth/react";
import { revalidatePath } from "next/cache";

const loginFormSchema = z.object({
  email: z.string().email({
    message: "Invalid email address.",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  const { data: session, update } = useSession();

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: { email: "", password: "" },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: (values: SignInDetails) => {
      return signInUser(values as SignInDetails);
    },
    onSuccess: (data) => {
      // Handle success

      console.log("data", data);

      update();
      router.push("/dashboard");
    },
    onError: (error) => {
      // An error happened!
      console.log("error name", error);
      console.log("error message------------", error.message);
      if (error.message === "Invalid email or password") {
        form.setError("root" as "email" | "password" | "root", {
          type: "manual",
          message: error.message,
        });
      }
      if (error.message.split(" ")[0] === "UNVERIFIED") {
        const url = `/unverified?email=${form.getValues("email")}&name=${error.message.split(" ")[1]}`;
        router.push(url);
      }
    },
  });

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
    mutate(values);
  }

  const loading =
    form.formState.isSubmitting || form.formState.isValidating || isPending;

  if (session) {
    router.push("/dashboard");
  }
  return (
    <div className="flex w-full flex-col gap-2">
      <h2 className="text-4xl font-thin text-siteGreen">Sign in</h2>
      <p className="mb-6 text-siteText">
        Don&apos;t have an account?{" "}
        <Link className="text-siteGreen" href={"/signup"}>
          Create an account
        </Link>{" "}
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
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
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
                        placeholder="Password"
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
                login
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
            // onClickFn={(e) => {
            //   e?.preventDefault();
            //   form.handleSubmit(onSubmit)();
            // }}
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
    </div>
  );
}

export default LoginPage;
