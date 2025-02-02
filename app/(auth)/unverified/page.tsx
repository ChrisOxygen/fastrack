"use client";

import BtnLoadSpinner from "@/components/BtnLoadSpinner";
import RedirectToLogin from "@/components/RedirectToLogin";
import CustomButton from "@/components/ui/CustomButton";
import { sendVerificationEmail } from "@/utils/actions/user.actions";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Separator } from "@radix-ui/react-select";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

function Unverified() {
  const [hasSentLink, setHasSentLink] = useState(false);
  const params = useSearchParams();
  const email = params.get("email");
  const name = params.get("name");

  const { mutate, isPending, isError } = useMutation({
    mutationFn: () => {
      return sendVerificationEmail(email as string);
    },
    onError: (error) => {
      console.error("error", error);
    },
    onSuccess: (data) => {
      console.log("data-----------", data);
      setHasSentLink(true);
    },
  });

  const loading = isPending;
  return (
    <>
      {hasSentLink ? (
        <>
          <div className="flex flex-col items-center justify-center gap-4">
            <DotLottieReact
              src="https://lottie.host/c6625faa-a53c-4005-8015-d2e6a8557cc1/p3bL4JtiVI.lottie"
              autoplay
            />
            <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
              Verification email sent
            </h2>
            <p className="-mt-3 max-w-[400px] text-center text-siteText">
              we have sent a verification link to your email. Please check your
              email to verify your account.
            </p>
            <RedirectToLogin />
          </div>
        </>
      ) : (
        <>
          <div className="relative mb-[120px] flex flex-col items-center justify-center gap-4 lg:mb-0">
            <DotLottieReact
              src="https://lottie.host/487db9f8-469b-49c7-8eb1-232b5fc39f41/VTn0ISUCtz.lottie"
              autoplay
            />
            <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
              Hi {name}
            </h2>
            <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
              Verify your account
            </h2>
            <p className="-mt-3 max-w-[400px] text-center text-siteText">
              We have sent a verification link to your email. Please verify your
              account to continue, or click the button below to resend the
              email.
            </p>
            <CustomButton
              text={
                <div className="flex items-center justify-center gap-3">
                  Resend verification email
                  {loading && (
                    <span className="ml-2 text-white/30">
                      <BtnLoadSpinner />
                    </span>
                  )}
                </div>
              }
              onClickFn={() => mutate()}
              bgColor="orange"
              textColor="black"
              hoverBgColor="green"
            />
            <Separator className="h-[1px] w-full max-w-[470px] bg-siteGreen/30" />
            <p className="-mt-3 max-w-[400px] text-center text-siteText">
              If you registered with the wrong email, click the button below to
              register again.
            </p>

            <CustomButton
              text={"Register a new account"}
              href="/signup"
              bgColor="green"
              textColor="white"
              hoverBgColor="orange"
            />
          </div>
        </>
      )}
    </>
  );
}

export default Unverified;
