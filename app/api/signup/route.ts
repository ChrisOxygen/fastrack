import { connectToDatabase } from "@/app/utils/database";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { NextResponse } from "next/server";
import {
  awardReferralBonus,
  createTransaction,
} from "@/utils/transactionServices";
import Transaction from "@/models/transaction";
import { generateUniqueReferralCode } from "@/utils/services";

export type UserTransaction = {
  transactionId?: string;
  type:
    | "deposite"
    | "withdrawal"
    | "transfer"
    | "signup bonus"
    | "referral bonus";
  amount: number;
  status: "pending" | "success" | "error";
  fee: number;
};

export async function POST(req: Request, res: Response) {
  console.log("POST fired API");
  const { firstName, lastName, email, password, referralCode } =
    (await req.json()) as {
      firstName: string;
      lastName: string;
      email: string;
      password: string;
      referralCode?: string;
    };

  console.log("POST fired", email, password);

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new Error("User exists already!");
    }

    const userReferralCode = await generateUniqueReferralCode();

    console.log("userReferralCode", userReferralCode);

    const hashedPw = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPw,
      referralCode: userReferralCode,
    });

    console.log("user saved");

    await createTransaction(
      {
        type: "signup bonus",
        amount: 100,
        status: "success",
        fee: 0,
      },
      newUser._id
    );

    console.log("signup bonus created");

    if (referralCode) {
      await awardReferralBonus(referralCode);
      console.log("referral bonus awarded");
    }

    //TODO: fix this error handling to be more specific

    return NextResponse.json({
      message: "User created successfully!",
      user: newUser,
    });
  } catch (error: any) {
    console.log(error);

    const deletedUser = await User.findOneAndDelete({
      email,
    });

    return new Response(error.message, { status: 422 });
  }
}
