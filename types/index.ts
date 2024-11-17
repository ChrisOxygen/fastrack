import { CyptoTransferMethodType } from "@/app/dashboard/deposit/page";

export type InvestmentTransactionType = {
  investmentPackage: "sapphire" | "emerald" | "diamond";
  amount: number;
  userId: string;
  status: "pending" | "success" | "error";
  fee: number;
  type:
    | "investment deposit"
    | "withdrawal"
    | "transfer"
    | "signup bonus"
    | "referral bonus"
    | "deposit";
};

export type DepositTransactionType = {
  amount: number;
  transferMethod: CyptoTransferMethodType;
  transferFee: number;
  tax: number;
  amountToReceive: number;
  userId: string;
};

export type CreateTransactionType = {
  type:
    | "investment deposit"
    | "withdrawal"
    | "transfer"
    | "signup bonus"
    | "referral bonus"
    | "deposit";
  amount: number;
  status: "pending" | "success" | "error";
  fee: number;
  userId: string;
};

export type WithdrawalDetails = {
  amount: number;
  deductableAmount: number;
  tax: number;
  fee: number;
  withdrawalMethod: "BTC" | "USDT";
  walletAddress: string;
  network?: string;
};

export type CustomError = Error & {
  field: string;
};

export type userCryptoDepositDetailsType = {
  amount: number;
  transferMethod: CyptoTransferMethodType;
  transferFee: number;
  amountToReceive: number;
  tax: number;
};
export type userTransferDetailsType = {
  reciverEmail: string;
  amount: number;
  note?: string;
  tax: number;
  amountToReceive: number;
};

export type BankWithdrawalDetailsType = {
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  fee: number;
  tax: number;
  deductableAmount: number;
};

export type PayPalWithdrawalDetailsType = {
  payPalEmail: string;
  amount: number;
  fee: number;
  tax: number;
  deductableAmount: number;
};

export type UserWdrawalDetailsType = {
  amount: number;
  deductableAmount: number;
  tax: number;
  fee: number;
  tfMethod: "BTC" | "USDT";
  walletAddress: string;
  network?: string;
};

export type userLoginDetailsType = {
  email: string;
  password: string;
};
