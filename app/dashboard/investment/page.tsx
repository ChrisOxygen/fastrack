"use client";

import InvestmentPackage from "@/components/InvestmentPackage";
import InvestmentsDisplay from "@/components/InvestmentsDisplay";
import LoadingSpinner from "@/components/LoadingSpinner";
import TotalBalanceSect from "@/components/TotalBalanceSect";
import useFetchUserData from "@/hooks/useFetchUserData";
import { getUserInvestments } from "@/utils/actions/investment.actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { INVESTMENT_PLANS } from "@/constants";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from "next/navigation";

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

  if (status === "unauthenticated") {
    redirect("/login");
  }
  if (investmentsStatus === "pending" || status === "loading")
    return <LoadingSpinner />;

  const hasInvestments = investments.length > 0;

  console.log(
    "investments",
    hasInvestments,
    investments,
    investments.length,
    investmentsStatus,
  );

  if (!hasInvestments) {
    return router.push("/dashboard/investment/create");
  }

  return (
    <div className="flex flex-col gap-5">
      <TotalBalanceSect isInvestmenyPage={true} />
      <InvestmentsDisplay investments={investments} />

      {/* {hasInvestments ? (
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(200px,300px)]">
          <InvestmentsDisplay investments={investments} />
          <div className="w-full">
            {INVESTMENT_PLANS.map((ivPackage, index) => (
              <InvestmentPackage key={index} ivPackage={ivPackage} />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full flex-col gap-5">
          <div className="">Invest Now</div>
          <div className="flex w-full flex-col gap-5">
            {INVESTMENT_PLANS.map((ivPackage, index) => (
              <InvestmentPackage key={index} ivPackage={ivPackage} />
            ))}
          </div>
        </div>
      )} */}
    </div>
  );
}

export default Investment;
