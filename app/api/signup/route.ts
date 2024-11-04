import bcrypt from "bcryptjs";

import { NextResponse } from "next/server";

import { generateUniqueReferralCode, handleError } from "@/utils/services";
import { ErrorWithMessageAndStatus } from "../auth/[...nextauth]/route";
import { connectToDatabase } from "@/utils/database";
import User from "@/utils/database/models/user.model";
import { createTransaction } from "@/utils/actions/transaction.actions";

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
  const {
    firstName,
    lastName,
    email,
    password,
    referralCode: referrersReferralCode,
  } = (await req.json()) as {
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

    const signUpBonus = await createTransaction({
      type: "signup bonus",
      amount: 100,
      status: "success",
      fee: 0,
      userId: newUser._id,
    });

    if (referrersReferralCode) {
      const referrer = await User.findOne({
        referralCode: referrersReferralCode,
      });
      if (referrer) {
        const referralBonus = await createTransaction({
          type: "referral bonus",
          amount: 50,
          status: "success",
          fee: 0,
          userId: referrer._id,
        });
      }
    }

    return newUser ? JSON.parse(JSON.stringify(newUser)) : null;
  } catch (error) {
    handleError(error, "signupNewUser");
  }
}
