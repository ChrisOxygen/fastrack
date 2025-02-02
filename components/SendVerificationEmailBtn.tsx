"use client";

import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import BtnLoadSpinner from "./BtnLoadSpinner";
import { useMutation } from "@tanstack/react-query";
import { sendVerificationEmail } from "@/utils/actions/user.actions";
import { toast } from "sonner";
import ToastBox from "./ToastBox";

function SendVerificationEmailBtn({
  userId,
  statusFn,
}: {
  userId: string;
  statusFn: () => void;
}) {
  const [emailSent, setEmailSent] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);

  const { mutate, isPending } = useMutation({
    mutationFn: () => sendVerificationEmail(userId),
    onSuccess: () => {
      setEmailSent(true);
      statusFn();
    },
    onError: (error) => {
      // An error happened!

      console.error("error", error);

      toast.custom(
        (t) => {
          const closeToast = () => {
            toast.dismiss(t);
          };
          return (
            <ToastBox
              variant="error"
              handleClose={closeToast}
              message=" an error occurred. Please to send verification email again"
            />
          );
        },
        {
          unstyled: true,
          style: {
            backgroundColor: "transparent",
          },
          onAutoClose: (t) => {
            toast.dismiss(t.id);
          },

          classNames: {
            toast: " bg-red-500 w-full",
          },
        },
      );
    },
  });

  useEffect(() => {
    if (emailSent) {
      setIsButtonDisabled(true);
      setRemainingTime(4 * 60); // 4 minutes in seconds
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setIsButtonDisabled(false);
            setEmailSent(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [emailSent]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  return (
    <Button
      disabled={isButtonDisabled}
      onClick={() => {
        mutate();
      }}
      className="ml-3 w-[300px] bg-siteGreen px-6 font-semibold uppercase hover:bg-siteOrange"
    >
      {isPending ? (
        <div className="flex items-center gap-2">
          <span className="">Generating email</span>
          <BtnLoadSpinner />
        </div>
      ) : isButtonDisabled ? (
        `Resend in ${formatTime(remainingTime)}`
      ) : (
        "Resend Verification Email"
      )}
    </Button>
  );
}

export default SendVerificationEmailBtn;
