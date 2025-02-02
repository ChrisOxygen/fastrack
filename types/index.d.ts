import { CyptoTransferMethodType } from "@/app/dashboard/deposit/page";

declare type InvestmentTransactionType = {
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

declare type DepositTransactionType = {
  amount: number;
  transferMethod: CyptoTransferMethodType;
  transferFee: number;
  tax: number;
  amountToReceive: number;
  userId: string;
};

declare type CreateTransactionType = {
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

declare type WithdrawalDetails = {
  amount: number;
  deductableAmount: number;
  tax: number;
  fee: number;
  withdrawalMethod: "BTC" | "USDT";
  walletAddress: string;
  network?: string;
};

declare type CustomError = Error & {
  field: string;
};

declare type userCryptoDepositDetailsType = {
  amount: number;
  transferMethod: CyptoTransferMethodType;
  transferFee: number;
  amountToReceive: number;
  tax: number;
};
declare type userTransferDetailsType = {
  reciverEmail: string;
  amount: number;
  note?: string;
  tax: number;
  amountToReceive: number;
};

declare type BankWithdrawalDetailsType = {
  bankName: string;
  accountNumber: string;
  accountName: string;
  amount: number;
  fee: number;
  tax: number;
  deductableAmount: number;
};

declare type PayPalWithdrawalDetailsType = {
  payPalEmail: string;
  amount: number;
  fee: number;
  tax: number;
  deductableAmount: number;
};

declare type UserWdrawalDetailsType = {
  amount: number;
  deductableAmount: number;
  tax: number;
  fee: number;
  tfMethod: "BTC" | "USDT";
  walletAddress: string;
  network?: string;
};

declare type userLoginDetailsType = {
  email: string;
  password: string;
};

declare interface SignUpDetails {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

declare interface SignInDetails {
  email: string;
  password: string;
}

declare type ErrorWithMessageAndStatus = {
  message: string;
  status: number;
  field?: string;
} & Error;

declare interface SessionUserProfile {
  id: string;
  name: string;
  avatar: string;
  email: string;
  isVerified: boolean;
}
