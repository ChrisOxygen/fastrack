"use client";

import copy from "copy-to-clipboard";
import { FiCopy, FiGift, FiMessageSquare, FiUserCheck } from "react-icons/fi";
import useFetchUserData from "@/hooks/useFetchUserData";
import { UserData } from "@/app/dashboard/layout";
import { notify } from "@/components/ReferEarnBox";
import LoadingSpinner from "@/components/LoadingSpinner";

function Referrals() {
  const { data, error, status } = useFetchUserData();

  if (status === "pending") {
    return <LoadingSpinner />;
  }
  const { referralCode } = data as UserData;
  function handleCopy() {
    copy(window.location.origin + "/signup/" + referralCode);
    console.log("copied");
    notify();
  }
  return (
    <section className="mx-auto mb-10 mt-10 flex w-full max-w-[800px] flex-col gap-20">
      <div className="flex flex-col items-center text-center">
        <h3 className="font-syne text-4xl font-bold">Referrals</h3>
        <span className="font-dm_sans text-siteHeadingDark/60">
          invite your friends to Fastrack and both of you get rewarded
        </span>
      </div>
      <div className="flex flex-col items-center justify-between gap-8 sm:flex-row sm:items-start sm:gap-0">
        <div className="flex w-full max-w-[230px] flex-col items-center gap-2">
          <span className="grid h-[90px] w-[90px] place-items-center rounded-full bg-siteGreen/20 text-4xl text-siteGreen">
            <FiMessageSquare />
          </span>
          <span className="font-dm_sans text-lg font-bold">
            Send invitation
          </span>
          <span className="text-center font-dm_sans text-siteHeadingDark/70">
            send your referral link to your friends and tell them how cool
            Fastrack is.
          </span>
        </div>
        <div className="flex w-full max-w-[230px] flex-col items-center gap-2">
          <span className="grid h-[90px] w-[90px] place-items-center rounded-full bg-siteGreen/20 text-4xl text-siteGreen">
            <FiUserCheck />
          </span>
          <span className="font-dm_sans text-lg font-bold">Registration</span>
          <span className="text-center font-dm_sans text-siteHeadingDark/70">
            They register using your referral link. the process will only take a
            few minutes.
          </span>
        </div>
        <div className="flex w-full max-w-[230px] flex-col items-center gap-2">
          <span className="grid h-[90px] w-[90px] place-items-center rounded-full bg-siteGreen/20 text-4xl text-siteGreen">
            <FiGift />
          </span>
          <span className="font-dm_sans text-lg font-bold">Recive Bonus</span>
          <span className="text-center font-dm_sans text-siteHeadingDark/70">
            Thats it! you both get rewarded with $50 each, and you can enjoy our
            service.
          </span>
        </div>
      </div>
      <div className="flex flex-col items-center text-siteHeadingDark">
        <span className="font-dm_sans text-lg font-bold">
          Your refferal code is:
        </span>
        <span className="font-dm_sans text-[80px] font-bold text-stone-500/40">
          {referralCode}
        </span>
        <span className="font-dm_sans text-lg font-bold">
          Your refferal link is:
        </span>
        <span className="my-5 rounded-xl bg-green-800/25 px-4 py-2 font-dm_sans font-bold text-green-800">
          {window.location.origin}/signup/{referralCode}
        </span>

        <button
          className="flex items-center justify-center gap-2 rounded-lg bg-[#1A5B4C] px-5 py-2 text-white shadow-sm"
          onClick={function () {
            handleCopy();
          }}
        >
          <FiCopy />
          copy referal link
        </button>
      </div>
    </section>
  );
}

export default Referrals;
