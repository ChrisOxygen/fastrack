"use client";

import { getUserData } from "@/utils/actions/user.actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function useFetchUserData() {
  const { data: session } = useSession();

  const { data, error, status } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUserData(session?.user?.id!);
    },
    enabled: !!session?.user.id,
  });

  const router = useRouter();

  if (!session) {
    router.push("/login");
  }
  return { data, error, status, session };
}

export default useFetchUserData;
