"use client";

import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import CustomButton from "@/components/ui/CustomButton";
import { CgArrowRight } from "react-icons/cg";
import SendVerificationEmailBtn from "@/components/SendVerificationEmailBtn";
import { useMutation, useQuery } from "@tanstack/react-query";
import { verifiyAccout } from "@/utils/actions/user.actions";

function VerifyAcountPage() {
  const [status, setStatus] = useState<
    "pending" | "isVerified" | "expiredCode" | "wrongCode" | "newCodeSent"
  >("pending");
  const [userId, setUserId] = useState<null | string>(null);

  const params = useSearchParams();
  const router = useRouter();

  const verificationCode = params.get("code");
  const email = params.get("email");

  const { isPending, isError, data, error } = useQuery({
    queryKey: [email, verificationCode],
    queryFn: () => verifiyAccout({ email: email!, code: verificationCode! }),
    enabled: status === "pending",
  });

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

    if (status !== data.status) {
      setUserId(data.userId as string);
      setStatus(
        data.status as "pending" | "isVerified" | "expiredCode" | "wrongCode",
      );
    }
  }

  if (!verificationCode || !email) {
    router.push("/login");
  }

  const handleSentNewCode = () => {
    if (status !== "newCodeSent") setStatus("newCodeSent");
  };

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
            Sit tight!
          </h2>
          <p className="-mt-3 max-w-[400px] text-center text-siteText">
            We&apos;re verifying your account. This may take a few seconds.
          </p>
        </>
      )}
      {status === "isVerified" && (
        <>
          <DotLottieReact
            src="https://lottie.host/f03737ec-6c1a-4216-955b-41d9c2dec2f8/R5JYtXZIry.lottie"
            autoplay
          />
          <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
            Congatulations 🎉
          </h2>
          <p className="-mt-3 max-w-[400px] text-center text-siteText">
            Your account has been verified. You can now login.
          </p>
          <CustomButton
            href="/login"
            text="Login"
            iconPosition="right"
            bgColor="green"
            hoverBgColor="orange"
            textColor="white"
            icon={<CgArrowRight />}
          />
        </>
      )}
      {status === "expiredCode" && (
        <>
          <DotLottieReact
            src="https://lottie.host/4ff3d03b-03b1-42cf-929e-7452f09cfc90/7dFeHeCmkq.lottie"
            loop
            autoplay
          />
          <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
            Oops Timeout!
          </h2>
          <p className="-mt-3 max-w-[400px] text-center text-siteText">
            Your verification code has expired. Please request a new one.
          </p>
          <SendVerificationEmailBtn
            userId={userId!}
            statusFn={handleSentNewCode}
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
            Invalid Code!
          </h2>
          <p className="-mt-3 max-w-[400px] text-center text-siteText">
            Your verification code is invalid. Please request a new one.
          </p>
          <SendVerificationEmailBtn
            userId={userId!}
            statusFn={handleSentNewCode}
          />
        </>
      )}
      {status === "newCodeSent" && (
        <>
          <DotLottieReact
            src="https://lottie.host/dd62eaf7-0f43-4390-b9a5-48b92d7f9a07/voJRKtHsX5.lottie"
            autoplay
          />
          <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
            Verification email sent!
          </h2>
          <p className="-mt-3 max-w-[400px] text-center text-siteText">
            We&apos;ve sent the verification link to your email, click the link
            in your email to verify your account&quot;
          </p>
          <SendVerificationEmailBtn
            userId={userId!}
            statusFn={handleSentNewCode}
          />
        </>
      )}
    </div>
  );
}

export default VerifyAcountPage;
