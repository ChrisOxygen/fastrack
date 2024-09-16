import { connectToDatabase } from "@/app/utils/database";
import Transaction from "@/models/transaction";
import User from "@/models/user";
import {
  BankWithdrawalDetailsType,
  generateUniqueTransactionId,
} from "@/utils/services";
import WithdrawalTransaction from "@/models/withdrawalTransaction";
import { UserTransaction } from "../../signup/route";

export type CustomError = Error & {
  field: string;
};

export async function POST(req: Request, res: Response) {
  try {
    const withdrawalDetails =
      (await req.json()) as BankWithdrawalDetailsType & {
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
      bankName,
      accountName,
      accountNumber,
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

    const transactions = (await Transaction.find()) as UserTransaction[];

    const allTransactionIds = transactions.map((transaction) => {
      return transaction.transactionId;
    });

    const uniqueTransactionId = generateUniqueTransactionId(
      allTransactionIds as string[],
    );

    const newTransaction = await Transaction.create({
      transactionId: uniqueTransactionId,
      type: "withdrawal",
      amount: amount,
      status: "pending",
      fee: fee,
      user: currentUser._id,
    });

    await newTransaction.save();

    if (!newTransaction) {
      throw new Error("Something went wrong!");
    }

    const withdrawalTransaction = await WithdrawalTransaction.create({
      withdrawalMethod: "bank",
      deductableAmount: deductableAmount,
      tax: tax,
      bankName: bankName,
      accountName: accountName,
      accountNumber: accountNumber,
      transaction: newTransaction._id,
    });

    await withdrawalTransaction.save();

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
