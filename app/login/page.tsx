import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";
import { getServerSession } from "next-auth";

type LoginInputs = {
  email: string;
  password: string;
};

async function Login() {
  const session = await getServerSession();

  if (session) {
    redirect("/dashboard");
  }

  return <LoginForm />;
  // return <div className="">Zod mando</div>;
}

export default Login;
