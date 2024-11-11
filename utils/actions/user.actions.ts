"use server";

import { createTransaction, getUserTransactions } from "./transaction.actions";
import bcrypt from "bcryptjs";
import { handleError } from "../services";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";
import { ErrorWithMessageAndStatus } from "@/app/api/auth/[...nextauth]/route";
import ShortUniqueId from "short-unique-id";
import { updateInvestmentsBasedOnDuration } from "./investment.actions";

export const getUserData = async (id: string) => {
  try {
    await connectToDatabase();

    const currentUser = await User.findById(id);

    await updateInvestmentsBasedOnDuration(id);

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
  console.log("signupNewUser fired", userDetails);
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

    console.log("existingUser", existingUser);

    if (existingUser) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "User exists already!";
      error.status = 409;
      throw error;
    }

    const hashedPw = await bcrypt.hash(password, 12);

    console.log("hashedPw", hashedPw);

    if (!hashedPw) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Password hashing failed!";
      error.status = 500;
      throw error;
    }

    const uid = new ShortUniqueId();
    const userReferralCode = uid.stamp(10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPw,
      referralCode: userReferralCode,
    });

    console.log("newUserr", newUser);

    const signUpBonus = await createTransaction({
      type: "signup bonus",
      amount: 100,
      status: "success",
      fee: 0,
      userId: newUser._id,
    });

    console.log("signUpBonus", signUpBonus);

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
    throw error as Error;
  }
};
