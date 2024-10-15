import { WithdrawalDetails } from "@/app/api/withdraw/route";

type ConfirmWithdrawalTransProps = {
  values: WithdrawalDetails;
  taxPecentage: number;
  reset: () => void;
  submitAfterConfirmation: () => void;
};

function ConfirmWithdrawalTrans({
  values,
  taxPecentage,
  reset,
  submitAfterConfirmation,
}: ConfirmWithdrawalTransProps) {
  const {
    amount,
    tax,
    deductableAmount,
    walletAddress,
    withdrawalMethod,
    network,
    fee,
  } = values;
  return (
    <div className="mx-auto flex w-full max-w-[700px] flex-col gap-5">
      <div className="rounded-2xl border border-siteHeadingDark/25 p-4">
        <div className="mb-4 mt-6 flex w-full flex-col items-center border-b border-siteHeadingDark/25 text-center">
          <span className="font-dm_sans font-bold text-siteHeadingDark/25">
            YOU ARE ABOUT TO WITHDRAW:
          </span>
          <h3 className="font-dm_sans text-[100px] font-bold text-siteHeadingDark">
            ${amount}
          </h3>
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-700"></span>
                <span className="text-siteHeadingDark/50">Transfer fee</span>
              </p>
              <span className="">{fee}$</span>
            </div>
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-700"></span>
                <span className="text-siteHeadingDark/50">Tax</span>
              </p>
              <span className="">
                {tax.toFixed(2)} USD ({taxPecentage}%)
              </span>
            </div>
          </div>
          <span className="grid h-[1px] bg-siteHeadingDark/25"></span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex items-center gap-1">
                <span className="">AMOUNT TO DECUCT</span>
              </p>
              <span className="">{deductableAmount} USD</span>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full gap-4">
        <button
          className="w-full rounded-xl bg-red-700 p-4 font-dm_sans font-bold text-white"
          onClick={function (e) {
            console.log("clicked");
            reset();
          }}
        >
          Cancel
        </button>
        <button
          className="w-full rounded-xl bg-green-700 p-4 font-dm_sans font-bold text-white"
          onClick={function (e) {
            submitAfterConfirmation();
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ConfirmWithdrawalTrans;
