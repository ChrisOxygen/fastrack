import { useRouter } from "next/navigation";

import Link from "next/link";
import { FiCheckCircle } from "react-icons/fi";

type TransactionSuccessProps = {
  reset: () => void;
  transactionId: string;
  view: "deposit" | "withdraw" | "transfer";
};

function TransactionSuccess({
  reset,
  transactionId,
  view,
}: TransactionSuccessProps) {
  const router = useRouter();
  const btnText =
    view === "deposit"
      ? "Make a deposit"
      : view === "withdraw"
        ? "Make a withdrawal"
        : "Transfer funds";

  return (
    <div className="mx-auto flex w-full max-w-[700px] flex-col gap-5">
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-siteHeadingDark/25 p-4">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-siteGreen text-5xl text-white">
          <FiCheckCircle />
        </span>
        <h3 className="font-dm_sans text-3xl font-semibold text-siteHeadingDark">
          Transaction Submitted
        </h3>
        <div className="flex flex-col items-center text-center font-dm_sans text-siteHeadingDark/60">
          <Link
            href={`/dashboard/transaction/${transactionId}`}
            className="font-semibold text-blue-700"
          >
            View Transaction Details here
          </Link>

          <p className="">
            Your transaction has been submitted successfully. once we verify the
            transaction, the amount will be credited to your account. this may
            take up to 24 hours.
          </p>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <button
          className="w-full rounded-xl bg-blue-700 p-4 font-dm_sans font-bold text-white"
          onClick={function (e) {
            console.log("clicked");
            reset();
          }}
        >
          {btnText}
        </button>
        <button
          className="w-full rounded-xl bg-green-700 p-4 font-dm_sans font-bold text-white"
          onClick={function (e) {
            reset();
            router.push("/dashboard");
          }}
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}

export default TransactionSuccess;
