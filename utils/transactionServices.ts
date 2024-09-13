import { UserTransaction } from "@/app/api/signup/route";

import { connectToDatabase } from "@/app/utils/database";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import Transaction from "@/models/transaction";
import { generateUniqueTransactionId } from "@/utils/services";

export const createTransaction = async (
  transactionDetails: UserTransaction,
  userId: string
) => {
  const { type, amount, status, fee } = transactionDetails;
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      throw new Error("User not found!");
    }

    const transactions = (await Transaction.find()) as UserTransaction[];

    console.log("transactions", transactions);

    const allTransactionIds = transactions.map((transaction) => {
      return transaction.transactionId;
    });

    console.log("allIds", allTransactionIds);

    const uniqueTransactionId = generateUniqueTransactionId(
      allTransactionIds as string[]
    );

    console.log("unique ID", uniqueTransactionId);
    const transaction = new Transaction({
      transactionId: uniqueTransactionId,
      type: type,
      amount: amount,
      status: status,
      fee: fee,
      user: user._id,
    });

    console.log("new transaction", transaction);

    if (!transaction) {
      throw new Error("Signup bonus creation failed!");
    }

    const newTransaction = await transaction.save();

    console.log("AAAAAAAAAAnew transaction", newTransaction);

    if (
      newTransaction.type !== "withdrawal" ||
      newTransaction.type !== "transfer"
    ) {
      if (newTransaction.status === "success") {
        user.balance += amount - fee;
      }
    }

    await user.save();
  } catch (error) {
    throw error as Error;
  }
};

export const awardReferralBonus = async (referralCode: string) => {
  try {
    await connectToDatabase();

    const referrer = await User.findOne({ referralCode });

    if (!referrer) {
      throw new Error("Referrer not found!");
    }

    const transactions = (await Transaction.find()) as UserTransaction[];

    const allTransactionIds = transactions.map((transaction) => {
      return transaction.transactionId;
    });

    const uniqueTransactionId = generateUniqueTransactionId(
      allTransactionIds as string[]
    );

    const newTransaction = await Transaction.create({
      transactionId: uniqueTransactionId,
      type: "referral bonus",
      amount: 50,
      status: "success",
      fee: 0,
      user: referrer._id,
    });

    if (!newTransaction) {
      throw new Error("Referral bonus creation failed!");
    }

    if (
      newTransaction.type !== "withdrawal" ||
      newTransaction.type !== "transfer"
    ) {
      if (newTransaction.status === "success") {
        referrer.balance += newTransaction.amount - newTransaction.fee;
      }
    }

    await referrer.save();
  } catch (error) {
    throw error as Error;
  }
};
