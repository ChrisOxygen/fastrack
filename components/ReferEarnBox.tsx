import { UserData } from "@/app/dashboard/layout";
import useFetchUserData from "@/hooks/useFetchUserData";
import copy from "copy-to-clipboard";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

export const notify = (mainText?: string) =>
  toast.custom(
    <div className="grid place-items-center rounded-lg bg-black/65 px-3 py-2 font-dm_sans font-semibold text-white backdrop-blur-lg">
      <span className="">{mainText || "Referral link copied"}</span>
    </div>,
  );

function ReferEarnBox() {
  const { data, error, status } = useFetchUserData();

  const { referralCode } = data as UserData;
  function handleCopy() {
    copy(window.location.origin + "/signup/" + referralCode);
    console.log("copied");
    notify();
  }
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl bg-siteLemon px-7 py-6 text-siteHeadingDark">
      <h3 className="font-syne text-3xl font-bold">Refer $ Earn</h3>
      <p className="text-center font-dm_sans">
        Share this link with a friend, and you both could be eligeble for a $50
        bonus.
      </p>
      <p className="rounded-xl border border-siteHeadingDark p-2 font-dm_sans text-3xl font-bold">
        {referralCode}
      </p>
      <span className="font-dm_sans font-bold"> or </span>
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
  );
}

export default ReferEarnBox;
