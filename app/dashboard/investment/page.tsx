"use client";

import InBoxLoader from "@/components/InBoxLoader";
import InvestmentsDisplay from "@/components/InvestmentsDisplay";
import TotalBalanceSect from "@/components/TotalBalanceSect";
import useFetchUserData from "@/hooks/useFetchUserData";

import { getUserInvestments } from "@/utils/actions/investment.actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";
import { useRouter } from "next/navigation";
import { UserData } from "../layout";
import CustomButton from "@/components/ui/CustomButton";

function Investment() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const {
    data: investments,
    error,
    status: investmentsStatus,
  } = useQuery({
    queryKey: ["user", "investments"],
    queryFn: () => {
      return getUserInvestments(session?.user?.id!);
    },
    enabled: !!session?.user.id,
  });

  const { data } = useFetchUserData();

  if (status === "unauthenticated") {
    redirect("/login");
  }
  if (investmentsStatus === "pending" || status === "loading")
    return <InBoxLoader />;

  const hasInvestments = investments.length > 0;

  console.log(
    "investments",
    hasInvestments,
    investments,
    investments.length,
    investmentsStatus,
  );

  // if (!hasInvestments) {
  //   return router.push("/dashboard/investment/create");
  // }

  const { balance } = data as UserData;

  return (
    <div className="grid h-full grid-rows-[max-content_1fr] gap-5">
      <TotalBalanceSect
        balance={balance}
        status={investmentsStatus}
        isInvestmenyPage={true}
      />
      {hasInvestments ? (
        <InvestmentsDisplay investments={investments} />
      ) : (
        <div className="grid h-full w-full place-items-center rounded-xl bg-slate-100 p-5">
          <div className="flex flex-col items-center gap-2 md:gap-4">
            <h3 className="text-center font-syne text-2xl font-bold capitalize text-siteGreen md:text-3xl">
              Make an investment
            </h3>
            <p className="max-w-[540px] text-center font-archivo text-siteText md:text-lg">
              You have not made any investments yet. Click the button below to
              get started. You&apos;ll look back and be glad you did.
            </p>
            <CustomButton
              href="/dashboard/investment/create"
              text="View Investment Plans"
              iconPosition="left"
              bgColor="green"
              hoverBgColor="orange"
              textColor="white"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Investment;
