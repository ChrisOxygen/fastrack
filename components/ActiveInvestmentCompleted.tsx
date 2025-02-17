"use client";

import { updateSingleInvestmentBasedOnDuration } from "@/utils/actions/investment.actions";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import InBoxLoader from "./InBoxLoader";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { useTimer } from "react-timer-hook";

type ActiveInvestmentCompletedProps = {
  investmentId: string;
};

function ActiveInvestmentCompleted({
  investmentId,
}: ActiveInvestmentCompletedProps) {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { data: session, status } = useSession();
  // const timer = useTimer({
  //   expiryTimestamp,
  // });
  const {
    data: investment,
    error,
    status: queryStatus,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["user", "invetment"],
    queryFn: () => {
      return updateSingleInvestmentBasedOnDuration(investmentId);
    },
    enabled: !!session?.user.id,
  });

  if (isError) {
    queryClient.invalidateQueries({
      queryKey: ["user", "investment", "investments"],
    });

    router.push(`/dashboard/investment`);
  }

  if (isSuccess) {
    console.log("isSuccess------------redirecting to processing");
    queryClient.invalidateQueries({
      queryKey: ["user", "investment", "investments"],
    });
  }
  return (
    <div className="">
      <DotLottieReact
        src="https://lottie.host/268b9a16-e6ed-4828-b8a7-defe9cbca651/WIkJ8qc3Tn.lottie"
        loop
        autoplay
      />
      <h2 className="text-3xl font-thin text-siteGreen md:text-4xl">
        Sit tight!
      </h2>
      <p className="-mt-3 max-w-[400px] text-center text-siteText">
        We&apos;re working on your investment.
      </p>
    </div>
  );
}

export default ActiveInvestmentCompleted;
