import { UserTransaction } from "@/app/api/signup/route";

import { connectToDatabase } from "@/app/utils/database";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import Transaction from "@/models/transaction";
import { generateUniqueTransactionId } from "@/utils/services";
import { ErrorWithMessageAndStatus } from "@/app/api/auth/[...nextauth]/route";
import { ok } from "assert";

export const createTransaction = async (
  transactionDetails: UserTransaction,
  userId: string,
) => {
  const { type, amount, status, fee } = transactionDetails;
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "User not found";
      error.status = 404;
      throw error;
    }

    const transactions = (await Transaction.find()) as UserTransaction[];

    if (!transactions) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Transactions not found";
      error.status = 404;
    }

    const allTransactionIds = transactions.map((transaction) => {
      return transaction.transactionId;
    });

    const uniqueTransactionId = generateUniqueTransactionId(
      allTransactionIds as string[],
    );

    const transaction = new Transaction({
      transactionId: uniqueTransactionId,
      type: type,
      amount: amount,
      status: status,
      fee: fee,
      user: user._id,
    });

    const newTransaction = await transaction.save();

    if (!newTransaction) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Transaction creation failed";
      error.status = 500;
      throw error;
    }

    if (
      newTransaction.type !== "withdrawal" ||
      newTransaction.type !== "transfer"
    ) {
      if (newTransaction.status === "success") {
        user.balance += amount - fee;
      }
    }

    const savedUser = await user.save();

    if (!savedUser) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "User balance update failed";
      error.status = 500;
      throw error;
    }

    return {
      message: "Transaction created successfully",
      ok: true,
    };
  } catch (error) {
    return {
      message: "Transaction not created",
      ok: false,
    };
  }
};

export const awardReferralBonus = async (referralCode: string) => {
  try {
    await connectToDatabase();

    const referrer = await User.findOne({ referralCode });

    if (!referrer) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "referrer not found";
      error.status = 404;
      throw error;
    }

    const transactions = (await Transaction.find()) as UserTransaction[];

    if (!transactions) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Transactions not found";
      error.status = 404;
    }

    const allTransactionIds = transactions.map((transaction) => {
      return transaction.transactionId;
    });

    const uniqueTransactionId = generateUniqueTransactionId(
      allTransactionIds as string[],
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
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Transaction creation failed";
      error.status = 500;
      throw error;
    }

    if (
      newTransaction.type !== "withdrawal" ||
      newTransaction.type !== "transfer"
    ) {
      if (newTransaction.status === "success") {
        referrer.balance += newTransaction.amount - newTransaction.fee;
      }
    }

    const savedUser = await referrer.save();

    if (!savedUser) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "User balance update failed";
      error.status = 500;
      throw error;
    }

    return {
      message: "Transaction created successfully",
      ok: true,
    };
  } catch (error) {
    return {
      message: "Transaction not created",
      ok: false,
    };
  }
};

export const getallTransactions = async () => {
  try {
    const currentTime = new Date();

    const updatedTransactions = await Transaction.updateMany(
      {
        status: "pending",
        type: "deposit",
        createdAt: { $lt: currentTime.getTime() - 24 * 60 * 60 * 1000 },
      },
      { status: "error" },
    );

    if (!updatedTransactions.acknowledged) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Transactions cound not be updated";
      error.status = 500;
      throw error;
    }

    console.log("Transactions updated successfully", updatedTransactions);

    const transactions = await Transaction.find();
    if (!transactions) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Transactions not found";
      error.status = 404;
      throw error;
    }

    return transactions;
  } catch (error) {
    throw error;
  }
};

export const getTransactionAndUniqueTransactionId = async () => {
  try {
    const transactions = await getallTransactions();

    const allTransactionIds = transactions.map((transaction) => {
      return transaction.transactionId;
    });

    const uniqueTransactionId = generateUniqueTransactionId(
      allTransactionIds as string[],
    );
    return { uniqueTransactionId };
  } catch (error) {
    throw error;
  }
};
