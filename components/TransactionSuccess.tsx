import { useTabSwitch } from "@/contex/TabSwitchProvider";

import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

type TransactionSuccessProps = {
  reset: () => void;
};

function TransactionSuccess({ reset }: TransactionSuccessProps) {
  const { activeScreen, setActiveScreen } = useTabSwitch();
  return (
    <div className=" flex flex-col gap-5 w-full max-w-[700px] mx-auto">
      <div className="border border-siteHeadingDark/25 rounded-2xl p-4 flex flex-col gap-4 items-center ">
        <span className=" w-20 h-20 grid place-items-center rounded-full bg-siteGreen text-white text-5xl">
          <FiCheckCircle />
        </span>
        <h3 className=" font-dm_sans font-semibold text-3xl text-siteHeadingDark">
          Transaction Submitted
        </h3>
        <div className="flex flex-col items-center font-dm_sans text-siteHeadingDark/60 text-center">
          <Link href="/dashboard" className=" font-semibold text-blue-700">
            View Transaction Details here
          </Link>

          <p className="">
            Your transaction has been submitted successfully. once we verify the
            transaction, the amount will be credited to your account. this may
            take up to 24 hours.
          </p>
        </div>
      </div>
      <div className="w-full flex gap-4">
        <button
          className=" p-4 w-full rounded-xl text-white font-bold font-dm_sans bg-blue-700"
          onClick={function (e) {
            console.log("clicked");
            reset();
          }}
        >
          Add more Money
        </button>
        <button
          className=" p-4 w-full rounded-xl text-white font-bold font-dm_sans bg-green-700"
          onClick={function (e) {
            console.log("clicked");
            reset();
            setActiveScreen("Dashboard");
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default TransactionSuccess;
