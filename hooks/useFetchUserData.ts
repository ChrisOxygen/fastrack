"use client";

import { getUserData } from "@/utils/actions/user.actions";
import { useQuery } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter, redirect } from "next/navigation";
import { use, useEffect, useState } from "react";

function useFetchUserData() {
  const { data: session, status: sessionStatus } = useSession();

  const { data, error, status } = useQuery({
    queryKey: ["user"],
    queryFn: () => {
      return getUserData(session?.user?.id!);
    },
    enabled: !!session?.user.id,
  });

  if (sessionStatus === "unauthenticated") {
    redirect("/login");
  }

  return { data, error, status, sessionStatus, session };
}

export default useFetchUserData;
