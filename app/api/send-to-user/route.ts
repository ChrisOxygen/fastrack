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
  console.log("initiateFundsTransfer API fired");

  try {
    const transferDetails = (await req.json()) as userTransferDetailsType & {
      userId: string;
    };

    if (!transferDetails) {
      const error = new Error("Somthing went wrong") as CustomError;
      error.field = "none";
      throw error;
    }

    console.log("transferDetails", transferDetails);

    const { amount, reciverEmail, note, tax, amountToReceive, userId } =
      transferDetails;

    await connectToDatabase();

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      const error = new Error("Somthing went wrong") as CustomError;
      error.field = "none";
      throw error;
    }
    console.log("currentUser In transfer API", currentUser);

    // verify if user has enough balance to make transfer

    console.log("currentUser balance", currentUser.balance, "amount", amount);
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

    console.log("reciver in transfer API", reciver);

    const transactions = (await Transaction.find()) as UserTransaction[];

    console.log("array of transactions In transfer API", transactions);

    const allTransactionIds = transactions.map((transaction) => {
      return transaction.transactionId;
    });

    console.log("all transaction IDs In transfer API", allTransactionIds);

    const uniqueTransactionId = generateUniqueTransactionId(
      allTransactionIds as string[],
    );

    console.log("unique transaction ID In transfer API", uniqueTransactionId);

    const newTransaction = await Transaction.create({
      transactionId: uniqueTransactionId,
      type: "transfer",
      amount: amount,
      status: "pending",
      fee: 0,
      user: currentUser._id,
    });

    console.log("newTransaction in transfer API", newTransaction);

    await newTransaction.save();

    if (!newTransaction) {
      throw new Error("Something went wrong!");
    }

    console.log("newTransaction in transfer API", newTransaction);

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

    console.log("transferTransaction in transfer API", transferTransaction);

    currentUser.balance -= amount;

    await currentUser.save();

    const res = new Response(
      JSON.stringify({ message: "New transfer transaction created" }),
    );

    console.log("response in transfer API", res);

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
