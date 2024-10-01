import { connectToDatabase } from "@/app/utils/database";
import bcrypt from "bcryptjs";
import User from "@/models/user";
import { NextResponse } from "next/server";
import {
  awardReferralBonus,
  createTransaction,
} from "@/utils/transactionServices";
import { generateUniqueReferralCode } from "@/utils/services";
import { ErrorWithMessageAndStatus } from "../auth/[...nextauth]/route";

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

  try {
    await connectToDatabase();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "User exists already!";
      error.status = 409;
      throw error;
    }

    const hashedPw = await bcrypt.hash(password, 12);

    if (!hashedPw) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Password hashing failed!";
      error.status = 500;
      throw error;
    }

    const userReferralCode = await generateUniqueReferralCode();

    if (!userReferralCode) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Referral code generation failed!";
      error.status = 500;
      throw error;
    }

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPw,
      referralCode: userReferralCode,
    });

    if (!newUser) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "User creation failed!";
      error.status = 500;
      throw error;
    }

    const signUpBonus = await createTransaction(
      {
        type: "signup bonus",
        amount: 100,
        status: "success",
        fee: 0,
      },
      newUser._id,
    );

    if (!signUpBonus.ok) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Signup bonus creation failed!";
      error.status = 500;
      throw error;
    }

    if (referralCode) {
      const referalTransaction = await awardReferralBonus(referralCode);
      if (!referalTransaction.ok) {
        const error = new Error() as ErrorWithMessageAndStatus;
        error.message = "Referral bonus creation failed!";
        error.status = 500;
        throw error;
      }
    }

    //TODO: fix this error handling to be more specific

    return NextResponse.json({
      message: "User created successfully!",
      user: newUser,
    });
  } catch (error: any) {
    const deletedUser = await User.findOneAndDelete({
      email,
    });

    return new Response(error.message, { status: 422 });
  }
}
