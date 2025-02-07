"use server";

import {
  createTransaction,
  getUserTransactions,
  updateAllTransactionType,
} from "./transaction.actions";
import bcrypt from "bcryptjs";
import { handleError } from "../services";
import { connectToDatabase } from "../database";
import User from "../database/models/user.model";

import ShortUniqueId from "short-unique-id";
import { updateInvestmentsBasedOnDuration } from "./investment.actions";
import { InvalidLoginError, signIn, UnverifiedUserError } from "@/auth";
import { ErrorWithMessageAndStatus, SignInDetails } from "@/types";
import { CustomFormError } from "@/lib/utils";

import { Resend } from "resend";

import VerificationEmail from "@/emails/VerificationEmail";
import VerificationCode from "../database/models/verificationCode.model";
import ResetPwCode from "../database/models/resetPwCode.model";
import ResetPasswordEmail from "@/emails/resetPasswordEmail";

export async function handleServerErrors(error: ErrorWithMessageAndStatus) {
  console.log("error in handleServerErrors", error);
  const customError = {
    message: error.message || "An error occurred",
    statusCode: error.status || 500,
    field: error.field || "root",
  } as CustomFormError;

  const errorString = `CM ${customError.field} ${customError.message}`;

  throw new Error(errorString);
}

export const sendVerificationEmail = async (email: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "User not found!";
      error.status = 404;
      throw error;
    }

    const uid = new ShortUniqueId();
    const userVerificationCode = uid.stamp(10);

    const hashedVcode = await bcrypt.hash(userVerificationCode, 12);

    if (!hashedVcode) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Verification code hashing failed!";
      error.status = 500;
      throw error;
    }

    await VerificationCode.findOneAndDelete({ userId: user._id });

    const verificationCode = await VerificationCode.create({
      hashedCode: hashedVcode,
      userId: user._id,
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "no-reply@fastrackinvestment.com",
      to: user.email,
      subject: "Verify your account",
      react: VerificationEmail({
        name: user.firstName,
        verificationLink: `${process.env.NEXTAUTH_URL}/verify-email?email=${user.email}&code=${userVerificationCode}`,
      }),
    });
    return user ? JSON.parse(JSON.stringify({ success: true })) : null;
  } catch (error) {
    throw new Error("unable to send verification email");
  }
};

export const verifiyAccout = async (data: { email: string; code: string }) => {
  const { email, code } = data;
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "User not found!";
      error.status = 404;
      throw error;
    }
    const verificationCode = await VerificationCode.findOne({
      userId: user._id,
    });

    if (!verificationCode) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Verification code not found!";
      error.status = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(code, verificationCode.hashedCode);

    if (!isMatch) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Invalid verification code!";
      error.status = 400;
      throw error;
    }

    // check if code is expired

    const now = new Date();
    const codeCreatedAt = verificationCode.createdAt;
    const diff = now.getTime() - codeCreatedAt.getTime();
    const diffInMinutes = diff / 1000 / 60;

    if (diffInMinutes > 10) {
      return JSON.parse(
        JSON.stringify({ status: "expiredCode", userId: user._id }),
      );
    }

    user.isVerified = true;
    await user.save();

    await VerificationCode.findOneAndDelete({ userId: user._id });

    return JSON.parse(
      JSON.stringify({ status: "isVerified", userId: user._id }),
    );
  } catch (error) {
    throw error;
  }
};

export const getUserData = async (id: string) => {
  console.log("getUserData fired------------------", id);
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
    console.log("userObj------------------", userObj);
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

    const uid = new ShortUniqueId();
    const userReferralCode = uid.stamp(10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPw,
      referralCode: userReferralCode,
      isVerified: false,
    });

    if (!newUser) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "User creation failed!";
      error.status = 500;
      throw error;
    }

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

    // create verification code and send email

    const userVerificationCode = uid.stamp(10);

    const hashedVcode = await bcrypt.hash(userVerificationCode, 12);

    if (!hashedVcode) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Verification code hashing failed!";
      error.status = 500;
      throw error;
    }

    const verificationCode = await VerificationCode.create({
      hashedCode: hashedVcode,
      userId: newUser._id,
    });

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "no-reply@fastrackinvestment.com",
      to: newUser.email,
      subject: "Welcome to Fastrack",
      react: VerificationEmail({
        name: newUser.firstName,
        verificationLink: `${process.env.NEXTAUTH_URL}/verify-email?email=${newUser.email}&code=${userVerificationCode}`,
      }),
    });

    return newUser ? JSON.parse(JSON.stringify({ success: true })) : null;
  } catch (error) {
    throw error as Error;
  }
};

export const signInUser = async (data: SignInDetails) => {
  // remember to import the signIn function not from next-auth/react but from "@/auth"

  try {
    const signedIn = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (signedIn && signedIn.error) {
      throw new Error(signedIn.code);
    }

    return JSON.parse(JSON.stringify({ success: true }));
  } catch (err) {
    if (err instanceof InvalidLoginError) {
      return JSON.parse(
        JSON.stringify({ error: true, message: "Invalid email or password" }),
      );
    } else {
      const error = err as UnverifiedUserError;
      const errorString = `UNVERIFIED ${error.userName}`;
      return JSON.parse(JSON.stringify({ error: true, message: errorString }));
    }
  }
};

export const sendPasswordResetEmail = async (email: string) => {
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "User with this email does not exits!";
      error.status = 404;
      throw error;
    }

    const uid = new ShortUniqueId();
    const resetPwCode = uid.stamp(10);

    const hashedResetPwCode = await bcrypt.hash(resetPwCode, 12);

    if (!hashedResetPwCode) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Password reset code hashing failed!";
      error.status = 500;
      throw error;
    }

    await ResetPwCode.findOneAndDelete({ userId: user._id });

    const resetCode = await ResetPwCode.create({
      hashedCode: hashedResetPwCode,
      userId: user._id,
    });

    if (!resetCode) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Password reset code creation failed!";
      error.status = 500;
      throw error;
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    await resend.emails.send({
      from: "no-reply@fastrackinvestment.com",
      to: user.email,
      subject: "Reset your password",
      react: ResetPasswordEmail({
        name: user.firstName,
        passwordResetLink: `${process.env.NEXTAUTH_URL}/reset-password?email=${user.email}&code=${resetPwCode}`,
      }),
    });

    return JSON.parse(JSON.stringify({ success: true }));
  } catch (error) {
    throw error;
  }
};

export const validatePwResetLink = async (data: {
  email: string;
  code: string;
}) => {
  console.log("validatePwResetLink------------------------");
  const { email, code } = data;
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "User not found!";
      error.status = 404;
      throw error;
    }
    const pwResetCode = await ResetPwCode.findOne({
      userId: user._id,
    });

    if (!pwResetCode) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Verification code not found!";
      error.status = 404;
      throw error;
    }

    const isMatch = await bcrypt.compare(code, pwResetCode.hashedCode);

    if (!isMatch) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Invalid verification code!";
      error.status = 400;
      throw error;
    }

    // check if code is expired

    const now = new Date();
    const codeCreatedAt = pwResetCode.createdAt;
    const diff = now.getTime() - codeCreatedAt.getTime();
    const diffInMinutes = diff / 1000 / 60;

    if (diffInMinutes > 10) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Code expired!";
      error.status = 400;
      throw error;
    }

    console.log("pwResetCode", pwResetCode);

    await ResetPwCode.findOneAndDelete({ userId: user._id });

    return JSON.parse(
      JSON.stringify({ success: true, firstName: user.firstName }),
    );
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const resetPassword = async (values: {
  email: string;
  password: string;
}) => {
  const { email, password } = values;
  try {
    await connectToDatabase();

    const user = await User.findOne({ email });

    if (!user) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "User not found!";
      error.status = 404;
      throw error;
    }

    const hashedPw = await bcrypt.hash(password, 12);

    if (!hashedPw) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Password hashing failed!";
      error.status = 500;
      throw error;
    }

    user.password = hashedPw;

    const savedUser = await user.save();

    if (!savedUser) {
      const error = new Error() as ErrorWithMessageAndStatus;
      error.message = "Password reset failed!";
      error.status = 500;
      throw error;
    }

    return JSON.parse(JSON.stringify({ success: true }));
  } catch (error) {
    throw error;
  }
};
