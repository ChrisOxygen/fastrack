import { connectToDatabase } from "@/app/utils/database";
import Transaction from "@/models/transaction";
import User from "@/models/user";
import { getToken } from "next-auth/jwt";
import { UserTransaction } from "../signup/route";
import {
  generateUniqueTransactionId,
  userDepositDetailsType,
} from "@/utils/services";
import DepositTransaction from "@/models/depositTransaction";

type CustomRequest = Request & {
  params: {
    id: string;
  };
};

export async function POST(req: Request, res: Response) {
  console.log("depositDetail API fired");
  const depositDetail = (await req.json()) as userDepositDetailsType & {
    userId: string;
  };

  console.log("depositDetail", depositDetail);

  const { amount, transferMethod, transferFee, tax, amountToReceive, userId } =
    depositDetail;

  try {
    await connectToDatabase();

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return new Response("User not found", { status: 404 });
    }
    console.log("currentUser In deposit API", currentUser);

    const transactions = (await Transaction.find()) as UserTransaction[];

    console.log("array of transactions In deposit API", transactions);

    const allTransactionIds = transactions.map((transaction) => {
      return transaction.transactionId;
    });

    console.log("all transaction IDs In deposit API", allTransactionIds);

    const uniqueTransactionId = generateUniqueTransactionId(
      allTransactionIds as string[],
    );

    console.log("unique transaction ID In deposit API", uniqueTransactionId);

    const newTransaction = await Transaction.create({
      transactionId: uniqueTransactionId,
      type: "deposit",
      amount: amount,
      status: "pending",
      fee: transferFee,
      user: currentUser._id,
    });

    console.log("newTransaction in deposit API", newTransaction);

    await newTransaction.save();

    if (!newTransaction) {
      throw new Error("Referral bonus creation failed!");
    }

    console.log("newTransaction in deposit API", newTransaction);

    const depositTransaction = await DepositTransaction.create({
      amountToRevive: amountToReceive,
      tax: tax,
      transferMethod: transferMethod,
      transaction: newTransaction._id,
    });

    await depositTransaction.save();

    if (!depositTransaction) {
      throw new Error("Deposit transaction creation failed!");
    }

    console.log("depositTransaction in deposit API", depositTransaction);

    const res = new Response(
      JSON.stringify({ message: "New deposite transaction created" }),
    );

    console.log("response in deposit API", res);

    return res;
  } catch (error: any) {
    console.log("the error that occured", error);
    return error as Error;
  }
}
