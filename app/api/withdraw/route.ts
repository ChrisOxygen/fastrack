import { connectToDatabase } from "@/app/utils/database";
import Transaction from "@/models/transaction";
import User from "@/models/user";
import {
  BankWithdrawalDetailsType,
  generateUniqueTransactionId,
} from "@/utils/services";
import WithdrawalTransaction, {
  IWithdrawalTransaction,
} from "@/models/withdrawalTransaction";
import { UserTransaction } from "../signup/route";
import { getTransactionAndUniqueTransactionId } from "@/utils/transactionServices";

export type CustomError = Error & {
  field: string;
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

export async function POST(req: Request, res: Response) {
  try {
    const withdrawalDetails = (await req.json()) as WithdrawalDetails & {
      userId: string;
    };

    if (!withdrawalDetails) {
      const error = new Error("Somthing went wrong") as CustomError;
      error.field = "none";
      throw error;
    }

    const {
      amount,
      deductableAmount,
      tax,
      fee,
      withdrawalMethod,
      walletAddress,
      network,
      userId,
    } = withdrawalDetails;

    await connectToDatabase();

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      const error = new Error("Somthing went wrong") as CustomError;
      error.field = "none";
      throw error;
    }

    // verify if user has enough balance to make transfer

    if (currentUser.balance < deductableAmount) {
      const error = new Error("Insuficient balance") as CustomError;
      error.field = "amount";
      throw error;
    }

    const { uniqueTransactionId } =
      await getTransactionAndUniqueTransactionId();

    const newTransaction = await Transaction.create({
      transactionId: uniqueTransactionId,
      type: "withdrawal",
      amount: amount,
      status: "pending",
      fee: fee,
      user: currentUser._id,
    });

    if (!newTransaction) {
      throw new Error("Something went wrong!");
    }

    const withdrawalTransaction = await WithdrawalTransaction.create({
      withdrawalMethod: withdrawalMethod,
      deductableAmount: deductableAmount,
      tax: tax,
      walletAddress: walletAddress,
      network: network && network,
      transaction: newTransaction._id,
    });

    if (!withdrawalTransaction) {
      const error = new Error("Somthing went wrong") as CustomError;
      error.field = "none";
      throw error;
    }

    currentUser.balance -= deductableAmount;

    await currentUser.save();

    const res = new Response(
      JSON.stringify({
        message: "New Bank withdrawal transaction created",
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
