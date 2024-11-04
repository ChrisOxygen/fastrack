import { getUserTransactions } from "@/utils/actions/transaction.actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";

function useUserTransactions(currentPage?: number) {
  const { data: session, status } = useSession();
  const {
    data: transactionsData,
    error,
    status: useTransactionStatus,
  } = useQuery({
    queryKey: ["user", "userTransactions", (currentPage = 1)],
    queryFn: () => {
      return getUserTransactions(session?.user?.id!, (currentPage = 1));
    },
    enabled: !!session?.user.id,
  });
  return {
    transactionsData,
    error,
    useTransactionStatus,
  };
}

export default useUserTransactions;
