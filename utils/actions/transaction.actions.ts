"use server";

import { connectToDatabase } from "../database";
import { handleError } from "../services";
import Transaction from "../database/models/transaction.model";
import {
  CreateTransactionType,
  DepositTransactionType,
  WithdrawalDetails,
} from "@/types";
import User from "../database/models/user.model";
import { TransactionType } from "@/app/dashboard/layout";

import DepositTransaction from "../database/models/depositTransaction.model";
import WithdrawalTransaction from "../database/models/withdrawalTransaction.model";
import ShortUniqueId from "short-unique-id";

const TRANSACTIONS_PER_PAGE = 10;

export const getAlltransactions = async () => {
  try {
    await connectToDatabase();
    const transactions = await Transaction.find();
    const allTransactions = transactions.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
    return allTransactions ? JSON.parse(JSON.stringify(allTransactions)) : null;
  } catch (error) {
    handleError(error, "getAlltransactions");
  }
};

export const getTransaction = async ({
  transId,
  id,
}: {
  transId?: string;
  id?: string;
}) => {
  console.log("getTransaction fired", id, transId);
  try {
    await connectToDatabase();
    let transaction;
    if (transId) {
      transaction = await Transaction.findOne({ transactionId: transId });
    }
    if (id) {
      transaction = await Transaction.findById(id);
    }

    console.log("transaction", transaction);
    return transaction ? JSON.parse(JSON.stringify(transaction)) : null;
  } catch (error) {
    handleError(error, "getTransaction");
  }
};

export const getUserTransactions = async (id: string, page: number) => {
  try {
    await connectToDatabase();
    const numberOfTransactions = await Transaction.countDocuments({ user: id });
    const transactions = await Transaction.find({ user: id }, null, {
      sort: { createdAt: -1 },
      limit: TRANSACTIONS_PER_PAGE,
      skip: (page - 1) * TRANSACTIONS_PER_PAGE,
    });

    const userTransactions = transactions
      ? JSON.parse(JSON.stringify(transactions))
      : null;

    return {
      userTransactions,
      numberOfTransactions,
    } as {
      userTransactions: TransactionType[];
      numberOfTransactions: number;
    };
  } catch (error) {
    handleError(error, "getUserTransactions");
  }
};
export const getUserOverview = async (id: string) => {
  try {
    await connectToDatabase();
    const numberOfTransactions = await Transaction.countDocuments({ user: id });

    const arrTotalDeposit = await Transaction.find({ user: id }).where({
      status: "success",
      type: "deposit",
    });

    const arrTotalReferralBonus = await Transaction.find({ user: id }).where({
      status: "success",
      type: "referral bonus",
    });

    const arrTotalWithdrawal = await Transaction.find({ user: id }).where({
      status: "success",
      type: "withdrawal",
    });

    const arrTotalTransfer = await Transaction.find({ user: id }).where({
      status: "success",
      type: "transfer",
    });

    const totalDeposit = arrTotalDeposit.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    const totalReferralBonus = arrTotalReferralBonus.reduce(
      (acc, transaction) => {
        return acc + 1;
      },
      0,
    );

    const totalWithdrawal = arrTotalWithdrawal.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    const totalTransfer = arrTotalTransfer.reduce((acc, transaction) => {
      return acc + transaction.amount;
    }, 0);

    console.log("total deposite", totalDeposit);

    return {
      numberOfTransactions,
      totalDeposit,
      totalReferralBonus,
      totalWithdrawal,
      totalTransfer,
    } as {
      numberOfTransactions: number;
      totalDeposit: number;
      totalReferralBonus: number;
      totalWithdrawal: number;
      totalTransfer: number;
    };
  } catch (error) {
    handleError(error, "getUserTransactions");
  }
};

export const createTransaction = async (
  transactionDetails: CreateTransactionType,
) => {
  console.log("transactionDetails", transactionDetails);
  const { type, amount, status, fee, userId } = transactionDetails;
  try {
    await connectToDatabase();

    const user = await User.findById({ _id: userId });

    if (user.balance < amount + fee) {
      throw new Error("Insufficient balance");
    }

    const uid = new ShortUniqueId();

    const uniqueTransactionId = `TR-${uid.stamp(10)}`;

    const transactionObj = {
      transactionId: uniqueTransactionId,
      type: type,
      amount: amount,
      status: status,
      fee: fee,
      user: user._id,
    };

    const newTransaction = await Transaction.create(transactionObj);

    if (newTransaction.status === "success") {
      if (newTransaction.type === "investment") {
        user.balance -= amount;
      }
      if (type === "signup bonus") {
        user.balance += amount;
      }
    }
    if (newTransaction.status === "pending") {
      if (newTransaction.type === "withdrawal") {
        user.balance -= amount + fee;
      }
    }

    await user.save();

    return newTransaction ? JSON.parse(JSON.stringify(newTransaction)) : null;
  } catch (error) {
    // handleError(error, "createTransaction");

    throw error;
  }
};

export const createDepositTransaction = async (
  depositDetails: DepositTransactionType,
) => {
  const { amount, transferMethod, transferFee, tax, amountToReceive, userId } =
    depositDetails;

  const transactionDetails = {
    type: "deposit",
    amount: amount,
    status: "pending",
    fee: transferFee,
    userId: userId,
  } as CreateTransactionType;
  try {
    await connectToDatabase();

    const newTransaction = await createTransaction(transactionDetails);
    const newDepositTransaction = await DepositTransaction.create({
      amountToReceive: amountToReceive,
      tax: tax,
      transferMethod: transferMethod,
      transaction: newTransaction._id,
    });
    return newDepositTransaction
      ? JSON.parse(JSON.stringify(newDepositTransaction))
      : null;
  } catch (error) {
    handleError(error, "createDepositTransaction");
  }
};

export const createWithdrawalTransaction = async (
  withdrawalDetails: WithdrawalDetails & {
    userId: string;
  },
) => {
  const {
    amount,
    fee,
    tax,
    deductableAmount,
    withdrawalMethod,
    walletAddress,
    network,
    userId,
  } = withdrawalDetails;

  console.log("withdrawalDetails", withdrawalDetails);

  const transactionDetails = {
    type: "withdrawal",
    amount: amount,
    status: "pending",
    fee: fee,
    userId: userId,
  } as CreateTransactionType;

  try {
    await connectToDatabase();

    const newTransaction = await createTransaction(transactionDetails);
    const newWithdrawalTransaction = await WithdrawalTransaction.create({
      withdrawalMethod: withdrawalMethod,
      deductableAmount: deductableAmount,
      tax: tax,
      walletAddress: walletAddress,
      network: network && network,
      transaction: newTransaction._id,
    });

    return newWithdrawalTransaction
      ? JSON.parse(
          JSON.stringify({
            ...newWithdrawalTransaction,
            transactionId: newTransaction.transactionId,
          }),
        )
      : null;
  } catch (error) {
    handleError(error, "createWithdrawalTransaction");
  }
};
