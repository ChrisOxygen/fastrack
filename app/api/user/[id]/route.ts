import { connectToDatabase } from "@/app/utils/database";
import Transaction from "@/models/transaction";
import User from "@/models/user";
import { getToken } from "next-auth/jwt";

type CustomRequest = Request & {
  params: {
    id: string;
  };
};

export async function GET(req: CustomRequest, res: Response) {
  const secret = process.env.NEXTAUTH_SECRET;
  const payload = (await getToken({ req, secret } as any)) as any;

  const id = payload.user.id;

  try {
    await connectToDatabase();

    const currentUser = await User.findById(id);

    if (!currentUser) {
      return new Response("User not found", { status: 404 });
    }

    const transactions = await Transaction.find({ user: id });

    const userTransactions = transactions
      .sort((a, b) => {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      })
      .map((transaction) => {
        const { __v, user, _id, ...rest } = transaction.toJSON();

        return rest;
      });

    const userObj = {
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      transactions: userTransactions,
      referralCode: currentUser.referralCode,
      balance: currentUser.balance,
    };

    return new Response(JSON.stringify(userObj), { status: 200 });
  } catch (error: any) {
    return new Response("Something went wrong", { status: 500 });
  }
}
