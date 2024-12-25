"use client";

import { redirect, useSearchParams } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";
import { use } from "react";
import { useSession } from "next-auth/react";

type LoginInputs = {
  email: string;
  password: string;
};

function Login() {
  const { data: session } = useSession();

  if (session) {
    redirect("/dashboard");
  }

  return <LoginForm />;
}

export default Login;
