import { connectToDatabase } from "@/app/utils/database";
import Transaction from "@/models/transaction";
import User from "@/models/user";
import { getToken } from "next-auth/jwt";
import { UserTransaction } from "../signup/route";
import {
  generateUniqueTransactionId,
  userCryptoDepositDetailsType,
  userDepositDetailsType,
} from "@/utils/services";
import DepositTransaction from "@/models/depositTransaction";
import { getallTransactions } from "@/utils/transactionServices";
import { CyptoTransferMethodType } from "@/app/dashboard/deposit/page";

type CustomRequest = Request & {
  params: {
    id: string;
  };
};

export async function POST(req: Request, res: Response) {
  console.log("depositDetail API fired");
  const depositDetail = (await req.json()) as userCryptoDepositDetailsType & {
    userId: string;
  };

  const { amount, transferMethod, transferFee, tax, amountToReceive, userId } =
    depositDetail;

  try {
    await connectToDatabase();

    const currentUser = await User.findById(userId);

    if (!currentUser) {
      return new Response("User not found", { status: 404 });
    }
    console.log("current user", currentUser);

    const transactions = (await getallTransactions()) as UserTransaction[];

    console.log("transactions", transactions);

    const allTransactionIds = transactions.map((transaction) => {
      return transaction.transactionId;
    });

    const uniqueTransactionId = generateUniqueTransactionId(
      allTransactionIds as string[],
    );

    const newTransaction = await Transaction.create({
      transactionId: uniqueTransactionId,
      type: "deposit",
      amount: amount,
      status: "pending",
      fee: transferFee,
      user: currentUser._id,
    });

    await newTransaction.save();

    if (!newTransaction) {
      throw new Error("Referral bonus creation failed!");
    }

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

    const res = new Response(
      JSON.stringify({
        message: "New deposite transaction created",
        transaction: {
          ...newTransaction.toJSON(),
          transferMethod:
            depositTransaction.transferMethod as CyptoTransferMethodType,
          amountToReceive: depositTransaction.amountToRevive,
        },
      }),
    );

    return res;
  } catch (error: any) {
    console.log("the error that occured", error);
    return new Response("Something went wrong", { status: 500 });
  }
}
