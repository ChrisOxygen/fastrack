import { connectToDatabase } from "@/app/utils/database";
import Transaction from "@/models/transaction";
import User from "@/models/user";
import { getToken } from "next-auth/jwt";
import { UserTransaction } from "../signup/route";
import {
  generateUniqueTransactionId,
  userDepositDetailsType,
  userTransferDetailsType,
} from "@/utils/services";
import DepositTransaction from "@/models/depositTransaction";
import TransferTransaction from "@/models/transferTransaction";
import { NextResponse } from "next/server";

export type CustomError = Error & {
  field: string;
};

export async function POST(req: Request, res: Response) {
  try {
    const transferDetails = (await req.json()) as userTransferDetailsType & {
      userId: string;
    };

    if (!transferDetails) {
      const error = new Error("Somthing went wrong") as CustomError;
      error.field = "none";
      throw error;
    }

    const { amount, reciverEmail, note, tax, amountToReceive, userId } =
      transferDetails;

    await connectToDatabase();

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      const error = new Error("Somthing went wrong") as CustomError;
      error.field = "none";
      throw error;
    }

    // verify if user has enough balance to make transfer

    if (currentUser.balance < amount) {
      const error = new Error("Insuficient balance") as CustomError;
      error.field = "amount";
      throw error;
    }

    //veryfy if reciver email is valid

    const reciver = await User.findOne({ email: reciverEmail });

    if (!reciver) {
      const error = new Error("user does not exist") as CustomError;
      error.field = "reciverEmail";
      throw error;
    }

    const transactions = (await Transaction.find()) as UserTransaction[];

    const allTransactionIds = transactions.map((transaction) => {
      return transaction.transactionId;
    });

    const uniqueTransactionId = generateUniqueTransactionId(
      allTransactionIds as string[],
    );

    const newTransaction = await Transaction.create({
      transactionId: uniqueTransactionId,
      type: "transfer",
      amount: amount,
      status: "pending",
      fee: 0,
      user: currentUser._id,
    });

    await newTransaction.save();

    if (!newTransaction) {
      throw new Error("Something went wrong!");
    }

    const transferTransaction = await TransferTransaction.create({
      amountToRevive: amountToReceive,
      tax: tax,
      reciverEmail: reciverEmail,
      note: note ? note : "",
      transaction: newTransaction._id,
    });

    await transferTransaction.save();

    if (!transferTransaction) {
      const error = new Error("Somthing went wrong") as CustomError;
      error.field = "none";
      throw error;
    }

    currentUser.balance -= amount;

    await currentUser.save();

    const res = new Response(
      JSON.stringify({
        message: "New transfer transaction created",
        transactionId: newTransaction.transactionId,
      }),
    );

    return res;
  } catch (error: any) {
    const errorObj = error as CustomError;

    // TODO: set status code based on error type
    const errorResponse = new Response(
      JSON.stringify({ error: errorObj.message, field: errorObj.field }),
      { status: 400 },
    );

    return errorResponse;
  }
}
