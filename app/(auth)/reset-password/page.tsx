"use client";

import RedirectToLogin from "@/components/RedirectToLogin";
import ResetPwForm from "@/components/ResetPwForm";
import CustomButton from "@/components/ui/CustomButton";

import { validatePwResetLink } from "@/utils/actions/user.actions";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useQuery } from "@tanstack/react-query";
import { stat } from "fs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { CgArrowRight } from "react-icons/cg";

function ResetPasswordPage() {
  const [status, setStatus] = useState<
    "pending" | "isValid" | "expiredCode" | "wrongCode" | "pwResetSuccess"
  >("pending");
  const [firstName, setFirstName] = useState<string | null>(null);

  const params = useSearchParams();
  const router = useRouter();

  const pwResetCode = params.get("code");
  const email = params.get("email");

  const { isPending, isError, data, error } = useQuery({
    queryKey: [email, pwResetCode],
    queryFn: () => validatePwResetLink({ email: email!, code: pwResetCode! }),
    enabled: status === "pending",
  });

  if (!pwResetCode || !email) {
    router.push("/login");
  }

  if (isError) {
    console.error("error", error);

    if (error?.message === "expiredCode") {
      if (status !== "expiredCode") {
        setStatus("expiredCode");
      }
    } else if (status !== "wrongCode") {
      setStatus("wrongCode");
    }
  }

  if (data) {
    console.log("data", data);
    if (status !== "isValid" && status !== "pwResetSuccess") {
      setStatus("isValid");
      setFirstName(data.firstName);
    }
  }

  const handleSuccess = () => {
    if (status !== "pwResetSuccess") setStatus("pwResetSuccess");
  };

  console.log("status", status);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {status === "pending" && (
        <>
          <DotLottieReact
            src="https://lottie.host/268b9a16-e6ed-4828-b8a7-defe9cbca651/WIkJ8qc3Tn.lottie"
            loop
            autoplay
          />
          <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
            Validating Reset Link
          </h2>
        </>
      )}
      {status === "isValid" && (
        <ResetPwForm
          email={email as string}
          firstName={firstName as string}
          onPwResetSuccess={handleSuccess}
        />
      )}
      {status === "expiredCode" && (
        <>
          <DotLottieReact
            src="https://lottie.host/4ff3d03b-03b1-42cf-929e-7452f09cfc90/7dFeHeCmkq.lottie"
            loop
            autoplay
          />
          <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
            Link expired!
          </h2>
          <p className="-mt-3 max-w-[400px] text-center text-siteText">
            Your password reset link has expired. Please request a new one.
          </p>
          <CustomButton
            href="/forgot-password"
            text="Request password reset link"
            iconPosition="right"
            bgColor="green"
            hoverBgColor="orange"
            textColor="white"
            icon={<CgArrowRight />}
          />
        </>
      )}
      {status === "wrongCode" && (
        <>
          <DotLottieReact
            src="https://lottie.host/9cf1bfae-667f-4e90-9f65-fcd1242a94b3/5pWaUhsGCl.lottie"
            loop
            autoplay
          />
          <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
            Invalid Link!
          </h2>
          <p className="-mt-3 max-w-[400px] text-center text-siteText">
            Your password reset link is invalid. Please request a new one.
          </p>
          <CustomButton
            href="/forgot-password"
            text="Request password reset link"
            iconPosition="right"
            bgColor="green"
            hoverBgColor="orange"
            textColor="white"
            icon={<CgArrowRight />}
          />
        </>
      )}
      {status === "pwResetSuccess" && (
        <>
          <DotLottieReact
            src="https://lottie.host/f03737ec-6c1a-4216-955b-41d9c2dec2f8/R5JYtXZIry.lottie"
            autoplay
          />
          <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
            Password Reset Successful!
          </h2>
          <p className="-mt-3 max-w-[400px] text-center text-siteText">
            Your password has been reset successfully. You can now login.
          </p>

          <RedirectToLogin />

          <CustomButton
            href="/login"
            text="login Now"
            iconPosition="right"
            bgColor="orange"
            hoverBgColor="green"
            textColor="white"
            icon={<CgArrowRight />}
          />
        </>
      )}
    </div>
  );
}

export default ResetPasswordPage;
