"use server";

import { createTransaction, getUserTransactions } from "./transaction.actions";
import bcrypt from "bcryptjs";
import { generateUniqueReferralCode, handleError } from "../services";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { ErrorWithMessageAndStatus } from "@/app/api/auth/[...nextauth]/route";
import { userLoginDetailsType } from "@/types";
import { signIn } from "next-auth/react";

export const getUserData = async (id: string) => {
  try {
    await connectToDatabase();

    const currentUser = await User.findById(id);

    const userObj = {
      email: currentUser.email,
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      referralCode: currentUser.referralCode,
      balance: currentUser.balance,
    };
    return userObj ? JSON.parse(JSON.stringify(userObj)) : null;
  } catch (error) {
    handleError(error, "getUserData");
  }
};

export const signupNewUser = async (userDetails: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referralCode?: string;
}) => {
  const {
    firstName,
    lastName,
    email,
    password,
    referralCode: referrersReferralCode,
  } = userDetails;
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
};

export const loginUser = async (userDetails: userLoginDetailsType) => {
  const { email, password } = userDetails;

  console.log("loginUser fired", userDetails);

  await signIn("credentials", {
    email,
    password,
    redirect: false,
  });
  // try {
  // } catch (error) {
  //   handleError(error, "loginUser");
  // }
};
