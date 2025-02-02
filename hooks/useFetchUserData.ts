"use client";

import { getUserData } from "@/utils/actions/user.actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";

function useFetchUserData() {
  const { data: session, status: sessionStatus } = useSession();

  const { data, error, status } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUserData(session?.user?.id!);
    },
    enabled: !!session?.user.id,
  });

  return { data, error, status, sessionStatus, session };
}

export default useFetchUserData;
