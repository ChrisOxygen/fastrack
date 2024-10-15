import { CustomError } from "@/app/api/send-to-user/route";
import { WithdrawalDetails } from "@/app/api/withdraw/route";
import { CyptoTransferMethodType } from "@/app/dashboard/deposit/page";

import { connectToDatabase } from "@/app/utils/database";
import User from "@/models/user";
import { signIn } from "next-auth/react";

//

type userSignupDetailsType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referralCode?: string;
};

type userLoginDetailsType = {
  email: string;
  password: string;
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

export const signupNewUser = async (userDetails: userSignupDetailsType) => {
  console.log("signupNewUser fired", userDetails);

  try {
    const res = await fetch(`/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    console.log("res", res);

    //TODO: fix this error handling to be more specific
    if (res.status === 422) {
      console.log(422);
      throw new Error("Email already exists.");
    }
    if (res.status !== 200 && res.status !== 201) {
      console.log("Error!");
      throw new Error("Creating a user failed!");
    }
  } catch (error) {
    throw error as Error;
  }
};
export const checkEmail = async (email: string) => {
  try {
    const res = await fetch("/api/checkemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    //TODO: fix this error handling to be more specific
    if (res.status === 422) {
      throw new Error(
        "Validation failed. Make sure the email address isn't used yet!",
      );
    }
    if (res.status !== 200 && res.status !== 201) {
      console.log("Error!");
      throw new Error("Checking email failed!");
    }

    return res.json();
  } catch (error) {
    throw error as Error;
  }
};

export const loginUser = async (userDetails: userLoginDetailsType) => {
  const { email, password } = userDetails;

  try {
    const res: any = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res.error) {
      throw new Error(res.error);
    }
  } catch (error) {
    throw error as Error;
  }
};

function getRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const getUserTransactions = () => {
  function getRandomString(length: number) {
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length),
      );
    }
    return result;
  }

  function getRandomDate(start: Date, end: Date) {
    return new Date(
      start.getTime() + Math.random() * (end.getTime() - start.getTime()),
    )
      .toISOString()
      .split("T")[0];
  }

  function getRandomAmount() {
    return (Math.random() * 1000).toFixed(2);
  }

  function getRandomFee() {
    return (Math.random() * 10).toFixed(2);
  }

  const transactionTypes = [
    "investment",
    "deposit",
    "transfer",
    "investment bonus",
    "referral bonus",
  ];
  const statuses = ["pending", "success", "error"];

  const accountActivities = Array.from({ length: 35 }, () => ({
    transactionId: getRandomString(10),
    transactionType:
      transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
    date: getRandomDate(new Date(2023, 0, 1), new Date()),
    amount: getRandomAmount(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    fee: getRandomFee(),
  }));

  return accountActivities;
};

export const generateUniqueTransactionId = (allTransactionsIds: string[]) => {
  let newTransactionId = getRandomString(10);
  while (allTransactionsIds.includes(newTransactionId)) {
    newTransactionId = getRandomString(10);
  }

  return newTransactionId;
};
export const generateUniqueReferralCode = async () => {
  try {
    await connectToDatabase();

    const users = await User.find();

    const allReferralCodes = users.map((user) => user.referralCode);
    let newReferralCode = getRandomString(10);
    while (allReferralCodes.includes(newReferralCode)) {
      newReferralCode = getRandomString(10);
    }

    return newReferralCode;
  } catch (error) {}
};

export const getUser = async (id: string) => {
  try {
    const res = await fetch(`/api/user/${id}`, {
      method: "GET",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data!");
    }
    return res.json();
  } catch (error) {
    console.log(error);

    throw error as Error;
  }
};

export const initiateCyptoDeposit = async (
  deposit: userCryptoDepositDetailsType,
  userId: string,
) => {
  const { amount, tax, transferMethod, transferFee, amountToReceive } = deposit;
  try {
    const res = await fetch(`/api/deposit/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount,
        userId,
        transferMethod,
        transferFee,
        amountToReceive,
        tax,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to initiate deposit!");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw error as Error;
  }
};

export const validateEmail = async (email: string) => {
  console.log("validateEmail fired", email);
  try {
    const res = await fetch(`/api/checkEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data!");
    }

    return true;
  } catch (error) {
    console.log(error);

    throw error as Error;
  }
};

export const initiateFundsTransfer = async (
  transferDetails: userTransferDetailsType,
  userId: string,
) => {
  console.log("initiateFundsTransfer fired", transferDetails);
  try {
    const res = await fetch(`/api/send-to-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...transferDetails,
        userId,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      const error = new Error() as CustomError;
      error.message = data.error;
      error.field = data.field;

      throw error;
    }

    const data = await res.json();

    return data;
  } catch (error) {
    throw error as CustomError;
  }
};

export const initiateWithdrawal = async (
  withdrawalDetails: WithdrawalDetails,
  userId: string,
) => {
  console.log("initiateWithdrawal fired", withdrawalDetails);

  try {
    const res = await fetch(`/api/withdraw`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...withdrawalDetails,
        userId,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      const error = new Error() as CustomError;
      error.message = data.error;
      error.field = data.field;

      console.log("error thrown", error);
      throw error;
    }

    const data = await res.json();

    console.log("data", data);

    return data;
  } catch (error) {
    throw error as CustomError;
  }
};
