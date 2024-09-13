type ConfirmWithdrawalTransProps = {
  values: {
    amount: number;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    payPalEmail?: string;
    fee: number;
    tax: number;
    deductableAmount: number;
  };
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
    bankName,
    accountNumber,
    accountName,
    payPalEmail,
    fee,
  } = values;
  return (
    <div className=" flex flex-col gap-5 w-full max-w-[700px] mx-auto">
      <div className="border border-siteHeadingDark/25 rounded-2xl p-4 ">
        <div className="w-full flex flex-col items-center text-center mt-6 border-b border-siteHeadingDark/25 mb-4">
          <span className="font-dm_sans font-bold text-siteHeadingDark/25">
            YOU ARE ABOUT TO WITHDRAW:
          </span>
          <h3 className=" font-dm_sans text-[100px] font-bold text-siteHeadingDark">
            ${amount}
          </h3>
        </div>
        <div className=" flex flex-col gap-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-green-700 rounded-full"></span>
                <span className=" text-siteHeadingDark/50">Transfer fee</span>
              </p>
              <span className="">{fee}$</span>
            </div>
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-green-700 rounded-full"></span>
                <span className=" text-siteHeadingDark/50">Tax</span>
              </p>
              <span className="">
                {tax.toFixed(2)} USD ({taxPecentage}%)
              </span>
            </div>
          </div>
          <span className="grid  h-[1px] bg-siteHeadingDark/25 "></span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex gap-1 items-center">
                <span className="">AMOUNT TO DECUCT</span>
              </p>
              <span className="">{deductableAmount} USD</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex gap-4">
        <button
          className=" p-4 w-full rounded-xl text-white font-bold font-dm_sans bg-red-700"
          onClick={function (e) {
            console.log("clicked");
            reset();
          }}
        >
          Cancel
        </button>
        <button
          className=" p-4 w-full rounded-xl text-white font-bold font-dm_sans bg-green-700"
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
