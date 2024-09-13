import { Dispatch, SetStateAction } from "react";
import { TransferMethodType } from "./screens/AddMoney";

type DepositConfirmProps = {
  inputData: {
    hasValidated: boolean;
    values: {
      amount: number;
      transferMethod: TransferMethodType;
      transferFee: number;
      tax: number;
      amountToReceive: number;
    };
  };
  reset: () => void;
  submitAfterConfirmation: () => void;
  taxPecentage: number;
};

type TransferConfirmProps = {
  inputData: {
    hasValidated: boolean;
    values: {
      reciverEmail: string;
      amount: number;
      note?: string;
      tax: number;
      amountToReceive: number;
    };
  };
  reset: () => void;
  submitAfterConfirmation: () => void;
  taxPecentage: number;
};

type WithdrawConfirmProps = {
  inputData: {
    values: {
      amount: number;
      bankName?: string;
      accountNumber?: string;
      accountName?: string;
      fee: number;
      tax: number;
      amountToReceive: number;
      payPalEmail?: string;
    };
  };
  reset: () => void;
  submitAfterConfirmation: () => void;
  taxPecentage: number;
};

type ConfirmTransactionProps = (
  | DepositConfirmProps
  | TransferConfirmProps
  | WithdrawConfirmProps
) & {
  transactionType: "deposit" | "transfer" | "withdraw";
};

function ConfirmTransaction({
  inputData,
  reset,
  taxPecentage,
  submitAfterConfirmation,
  transactionType,
}: ConfirmTransactionProps) {
  const isDeposit = transactionType === "deposit";
  const isTransfer = transactionType === "transfer";
  const isWithdraw = transactionType === "withdraw";

  console.log("isDeposit", isDeposit);

  return (
    <>
      {isDeposit && (
        <DepositTransaction
          inputData={
            inputData as {
              hasValidated: boolean;
              values: {
                amount: number;
                transferMethod: TransferMethodType;
                transferFee: number;
                tax: number;
                amountToReceive: number;
              };
            }
          }
          reset={reset}
          taxPecentage={taxPecentage}
          submitAfterConfirmation={submitAfterConfirmation}
        />
      )}
      {isTransfer && (
        <TransferTransaction
          inputData={
            inputData as {
              hasValidated: boolean;
              values: {
                reciverEmail: string;
                amount: number;
                note?: string;
                tax: number;
                amountToReceive: number;
              };
            }
          }
          reset={reset}
          taxPecentage={taxPecentage}
          submitAfterConfirmation={submitAfterConfirmation}
        />
      )}
      {isWithdraw && <div>Withdraw</div>}
    </>
  );
}

export default ConfirmTransaction;

function DepositTransaction({
  inputData,
  reset,
  taxPecentage,
  submitAfterConfirmation,
}: DepositConfirmProps) {
  const { amount, tax, transferFee, amountToReceive } = inputData.values;
  return (
    <div className=" flex flex-col gap-5 w-full max-w-[700px] mx-auto">
      <div className="border border-siteHeadingDark/25 rounded-2xl p-4 ">
        <div className="w-full flex flex-col items-center text-center mt-6 border-b border-siteHeadingDark/25 mb-4">
          <span className="font-dm_sans font-bold text-siteHeadingDark/25">
            BANK TRANSFER OF:
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
              <span className="">{transferFee} USD</span>
            </div>
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-green-700 rounded-full"></span>
                <span className=" text-siteHeadingDark/50">Tax</span>
              </p>
              <span className="">
                {tax} USD ({taxPecentage}%)
              </span>
            </div>
          </div>
          <span className="grid  h-[1px] bg-siteHeadingDark/25 "></span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex gap-1 items-center">
                <span className="">AMOUNT TO RECEIVE</span>
              </p>
              <span className="">{amountToReceive} USD</span>
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
function TransferTransaction({
  inputData,
  reset,
  taxPecentage,
  submitAfterConfirmation,
}: TransferConfirmProps) {
  const { amount, tax, amountToReceive } = inputData.values;
  return (
    <div className=" flex flex-col gap-5 w-full max-w-[700px] mx-auto">
      <div className="border border-siteHeadingDark/25 rounded-2xl p-4 ">
        <div className="w-full flex flex-col items-center text-center mt-6 border-b border-siteHeadingDark/25 mb-4">
          <span className="font-dm_sans font-bold text-siteHeadingDark/25">
            FUNDS TRANSFER OF:
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
              <span className="">FREE</span>
            </div>
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-green-700 rounded-full"></span>
                <span className=" text-siteHeadingDark/50">Tax</span>
              </p>
              <span className="">
                {tax} USD ({taxPecentage}%)
              </span>
            </div>
          </div>
          <span className="grid  h-[1px] bg-siteHeadingDark/25 "></span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex gap-1 items-center">
                <span className="">AMOUNT TO RECEIVE</span>
              </p>
              <span className="">{amountToReceive} USD</span>
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

function WithdrawTransaction({
  inputData,
  reset,
  taxPecentage,
  submitAfterConfirmation,
}: TransferConfirmProps) {
  const { amount, tax, amountToReceive } = inputData.values;
  return (
    <div className=" flex flex-col gap-5 w-full max-w-[700px] mx-auto">
      <div className="border border-siteHeadingDark/25 rounded-2xl p-4 ">
        <div className="w-full flex flex-col items-center text-center mt-6 border-b border-siteHeadingDark/25 mb-4">
          <span className="font-dm_sans font-bold text-siteHeadingDark/25">
            FUNDS TRANSFER OF:
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
              <span className="">FREE</span>
            </div>
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex gap-1 items-center">
                <span className="w-2 h-2 bg-green-700 rounded-full"></span>
                <span className=" text-siteHeadingDark/50">Tax</span>
              </p>
              <span className="">
                {tax} USD ({taxPecentage}%)
              </span>
            </div>
          </div>
          <span className="grid  h-[1px] bg-siteHeadingDark/25 "></span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex gap-1 items-center">
                <span className="">AMOUNT TO RECEIVE</span>
              </p>
              <span className="">{amountToReceive} USD</span>
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
