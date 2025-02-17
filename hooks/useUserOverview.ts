import { getToTalProfit } from "@/utils/actions/investment.actions";
import { getUserOverview } from "@/utils/actions/transaction.actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

function useUserOverview() {
  const { data: session, status } = useSession();
  const {
    data: overviewData,
    error,
    status: useOverviewStatus,
  } = useQuery({
    queryKey: ["user", "userTransactions"],
    queryFn: () => {
      return getUserOverview(session?.user?.id!);
    },
    enabled: !!session?.user.id,
  });
  const { data: profitData, status: profitDataStatus } = useQuery({
    queryKey: ["investments", "profit"],
    queryFn: () => {
      return getToTalProfit(session?.user?.id!);
    },
    enabled: !!session?.user.id,
  });
  return {
    overviewData,
    error,
    useOverviewStatus,
    profitData,
  };
}

export default useUserOverview;
