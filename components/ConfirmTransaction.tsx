import { TransferMethodType } from "@/app/dashboard/deposit/page";
import { Dispatch, SetStateAction } from "react";

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
    <div className="mx-auto flex w-full max-w-[700px] flex-col gap-5">
      <div className="rounded-2xl border border-siteHeadingDark/25 p-4">
        <div className="mb-4 mt-6 flex w-full flex-col items-center border-b border-siteHeadingDark/25 text-center">
          <span className="font-dm_sans font-bold text-siteHeadingDark/25">
            BANK TRANSFER OF:
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
              <span className="">{transferFee} USD</span>
            </div>
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-700"></span>
                <span className="text-siteHeadingDark/50">Tax</span>
              </p>
              <span className="">
                {tax} USD ({taxPecentage}%)
              </span>
            </div>
          </div>
          <span className="grid h-[1px] bg-siteHeadingDark/25"></span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex items-center gap-1">
                <span className="">AMOUNT TO RECEIVE</span>
              </p>
              <span className="">{amountToReceive} USD</span>
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
function TransferTransaction({
  inputData,
  reset,
  taxPecentage,
  submitAfterConfirmation,
}: TransferConfirmProps) {
  const { amount, tax, amountToReceive } = inputData.values;
  return (
    <div className="mx-auto flex w-full max-w-[700px] flex-col gap-5">
      <div className="rounded-2xl border border-siteHeadingDark/25 p-4">
        <div className="mb-4 mt-6 flex w-full flex-col items-center border-b border-siteHeadingDark/25 text-center">
          <span className="font-dm_sans font-bold text-siteHeadingDark/25">
            FUNDS TRANSFER OF:
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
              <span className="">FREE</span>
            </div>
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-700"></span>
                <span className="text-siteHeadingDark/50">Tax</span>
              </p>
              <span className="">
                {tax} USD ({taxPecentage}%)
              </span>
            </div>
          </div>
          <span className="grid h-[1px] bg-siteHeadingDark/25"></span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex items-center gap-1">
                <span className="">AMOUNT TO RECEIVE</span>
              </p>
              <span className="">{amountToReceive} USD</span>
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

function WithdrawTransaction({
  inputData,
  reset,
  taxPecentage,
  submitAfterConfirmation,
}: TransferConfirmProps) {
  const { amount, tax, amountToReceive } = inputData.values;
  return (
    <div className="mx-auto flex w-full max-w-[700px] flex-col gap-5">
      <div className="rounded-2xl border border-siteHeadingDark/25 p-4">
        <div className="mb-4 mt-6 flex w-full flex-col items-center border-b border-siteHeadingDark/25 text-center">
          <span className="font-dm_sans font-bold text-siteHeadingDark/25">
            FUNDS TRANSFER OF:
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
              <span className="">FREE</span>
            </div>
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-green-700"></span>
                <span className="text-siteHeadingDark/50">Tax</span>
              </p>
              <span className="">
                {tax} USD ({taxPecentage}%)
              </span>
            </div>
          </div>
          <span className="grid h-[1px] bg-siteHeadingDark/25"></span>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between font-dm_sans font-bold text-siteHeadingDark">
              <p className="flex items-center gap-1">
                <span className="">AMOUNT TO RECEIVE</span>
              </p>
              <span className="">{amountToReceive} USD</span>
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
