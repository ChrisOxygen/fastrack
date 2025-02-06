import Link from "next/link";
import Image from "next/image";

import { HiArrowNarrowRight } from "react-icons/hi";

import AuthSlider from "@/components/AuthSlider";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

async function AuthLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }
  return (
    <div className="flex h-full min-h-[100vh] w-full flex-col gap-10 overflow-hidden bg-cover bg-center p-5 lg:grid lg:h-screen lg:grid-cols-[minmax(300px,1fr)_minmax(500px,1fr)] lg:gap-0">
      <div
        className="overflow-hidden rounded-xl bg-cover bg-fixed bg-center"
        style={{
          backgroundImage: "url('/assets/hero-bg-1.svg')",
        }}
      >
        <div
          className="flex h-full w-full flex-col items-center justify-between gap-10 bg-cover bg-center p-5"
          style={{
            backgroundImage: "url('/assets/hero-line-shape-1.svg')",
          }}
        >
          <div className="flex w-full items-center justify-between">
            <Link
              href="/"
              className="flex gap-2 text-center font-syne text-xl font-bold"
            >
              <Image
                src="/fastrack-green.png"
                alt="Fastrack"
                width={150}
                height={10}
              />
            </Link>
            <Link
              href="/"
              className="flex items-center gap-2 rounded-xl border border-siteGreen/50 px-5 text-center font-bold capitalize text-siteGreen/50"
            >
              <span className="grid place-items-center">Home</span>
              <span className="grid place-items-center">
                <HiArrowNarrowRight />
              </span>
            </Link>
          </div>
          <div className="relative flex w-full flex-col items-center gap-12">
            <div className="hidden lg:block">
              <Image
                src="/assets/about_els_01.png"
                alt="Fastrack"
                width={645}
                height={780}
                className="h-[500px] w-full"
              />
            </div>
            <AuthSlider />
          </div>
        </div>
      </div>
      <div className="grid place-items-center px-0 md:px-[80px]">
        {children}
      </div>
    </div>
  );
}

export default AuthLayout;
