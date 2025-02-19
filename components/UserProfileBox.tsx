import useFetchUserData from "@/hooks/useFetchUserData";
import React from "react";
import { FiPower, FiUserCheck } from "react-icons/fi";
import { Skeleton } from "./ui/skeleton";
import { UserData } from "@/app/dashboard/layout";
import { signOut } from "next-auth/react";

function UserProfileBox() {
  const { data, status, error } = useFetchUserData();

  if (status === "pending") {
    return <Skeleton className="h-[70px] w-[314px]" />;
  }

  const { email, firstName, lastName } = data as UserData;
  return (
    <div className="mb-2 grid w-full grid-cols-[1fr_130px_1fr] items-center justify-center gap-2 rounded-lg border bg-white p-3 sm:grid-cols-[1fr_200px_1fr] xl:grid-cols-[1fr_197px_1fr]">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-siteHeadingDark/25">
        <FiUserCheck />
      </span>
      <div className="flex flex-col items-start">
        <span className="text-sm font-semibold capitalize">
          {`${firstName} ${lastName}`}
        </span>
        <span className="w-full overflow-hidden text-ellipsis">{email}</span>
      </div>
      <button
        className="grid place-items-center text-xl text-red-700"
        onClick={() => signOut()}
      >
        <FiPower />
      </button>
    </div>
  );
}

export default UserProfileBox;
