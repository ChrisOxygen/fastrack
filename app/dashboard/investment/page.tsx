"use client";

import InBoxLoader from "@/components/InBoxLoader";
import InvestmentsDisplay from "@/components/InvestmentsDisplay";
import TotalBalanceSect from "@/components/TotalBalanceSect";

import { getUserInvestments } from "@/utils/actions/investment.actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

import { redirect } from "next/navigation";
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
    return <InBoxLoader />;

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
      <TotalBalanceSect status={investmentsStatus} isInvestmenyPage={true} />
      <InvestmentsDisplay investments={investments} />
    </div>
  );
}

export default Investment;
