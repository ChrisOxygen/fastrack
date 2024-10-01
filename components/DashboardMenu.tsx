import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { GoMoveToStart } from "react-icons/go";
import SideBarMenuItem from "./SideBarMenuItem";
import { FiPower, FiUserCheck } from "react-icons/fi";
import useFetchUserData from "@/hooks/useFetchUserData";
import { UserData } from "@/app/dashboard/layout";
import { useRouter } from "next/navigation";

function DashboardMenu({ device }: { device: "mobile" | "desktop" }) {
  const { data } = useFetchUserData();

  const router = useRouter();

  const { email, firstName, lastName } = data as UserData;
  return (
    <aside
      className={`${device === "desktop" ? "hidden lg:flex" : "flex lg:hidden"} flex-col bg-siteBg p-5`}
    >
      <div className="flex items-center justify-between border-b-1 border-siteHeadingDark/25 py-4">
        <Link
          href="/"
          className="flex gap-2 text-center font-syne text-xl font-bold"
        >
          <Image
            src="/fastrack-green.png"
            alt="Kudizen"
            width={150}
            height={10}
          />
        </Link>

        <button
          className="rounded-md border border-siteHeadingDark/25 bg-white/50 p-2 text-siteGreen"
          onClick={() => router.back()}
        >
          <GoMoveToStart />
        </button>
      </div>
      <div className="flex h-full flex-col gap-2">
        <p className="my-4 font-dm_sans text-sm text-siteHeadingDark/50">
          GENERAL
        </p>
        <menu className="flex h-full flex-col gap-2">
          <SideBarMenuItem tabTitle="dashboard" />
          <SideBarMenuItem tabTitle="all transactions" />
          <SideBarMenuItem tabTitle="deposit" />
          <SideBarMenuItem tabTitle="transfer" />
          <SideBarMenuItem tabTitle="withdraw" />
          <SideBarMenuItem tabTitle="referrals" />
          <SideBarMenuItem tabTitle="settings" />
          <SideBarMenuItem tabTitle="support" />
        </menu>
      </div>

      <div className="flex flex-col items-center border-t-1 border-siteHeadingDark/25 py-4">
        <div className="mb-2 grid w-full grid-cols-[1fr_120px_1fr] items-center justify-center gap-2 rounded-lg bg-white p-3 shadow xl:grid-cols-[1fr_197px_1fr]">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-siteHeadingDark/25">
            <FiUserCheck />
          </span>
          <div className="flex flex-col items-start">
            <span className="text-sm font-semibold">
              {`${firstName} ${lastName}`}
            </span>
            <span className="w-full overflow-hidden text-ellipsis">
              {email}
            </span>
          </div>
          <button
            className="grid place-items-center text-xl text-red-700"
            onClick={() => signOut()}
          >
            <FiPower />
          </button>
        </div>
        <span className="">2024 Kudizen </span>
      </div>
    </aside>
  );
}

export default DashboardMenu;
