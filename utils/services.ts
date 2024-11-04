"use client";

import { signIn } from "next-auth/react";

//

type userSignupDetailsType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  referralCode?: string;
};

import { NextApiRequest, NextApiResponse } from "next";

import { connectToDatabase } from "./database";
import { userLoginDetailsType } from "@/types";
import User from "./database/models/user.model";

// Define custom error classes using ES6+ syntax
class ValidationError extends Error {
  details: string;

  constructor(details: string) {
    super(`Validation Error: ${details}`);
    this.name = "ValidationError";
    this.details = details;
  }
}

class DatabaseError extends Error {
  query: string;

  constructor(query: string, message: string) {
    super(`Database Error: ${message}`);
    this.name = "DatabaseError";
    this.query = query;
  }
}

class NotFoundError extends Error {
  resource: string;

  constructor(resource: string) {
    super(`Not Found: ${resource} was not found`);
    this.name = "NotFoundError";
    this.resource = resource;
  }
}

export const signupNewUser = async (userDetails: userSignupDetailsType) => {
  console.log("signupNewUser fired", userDetails);

  try {
    const res = await fetch(`/api/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });

    console.log("res", res);

    //TODO: fix this error handling to be more specific
    if (res.status === 422) {
      console.log(422);
      throw new Error("Email already exists.");
    }
    if (res.status !== 200 && res.status !== 201) {
      console.log("Error!");
      throw new Error("Creating a user failed!");
    }
  } catch (error) {
    throw error as Error;
  }
};
export const checkEmail = async (email: string) => {
  try {
    const res = await fetch("/api/checkemail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    //TODO: fix this error handling to be more specific
    if (res.status === 422) {
      throw new Error(
        "Validation failed. Make sure the email address isn't used yet!",
      );
    }
    if (res.status !== 200 && res.status !== 201) {
      console.log("Error!");
      throw new Error("Checking email failed!");
    }

    return res.json();
  } catch (error) {
    throw error as Error;
  }
};

function getRandomString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export const generateUniqueTransactionId = (allTransactionsIds: string[]) => {
  let newTransactionId = getRandomString(10);
  while (allTransactionsIds.includes(newTransactionId)) {
    newTransactionId = getRandomString(10);
  }

  return newTransactionId;
};
export const generateUniqueReferralCode = async () => {
  try {
    await connectToDatabase();

    const users = await User.find();

    const allReferralCodes = users.map((user) => user.referralCode);
    let newReferralCode = getRandomString(10);
    while (allReferralCodes.includes(newReferralCode)) {
      newReferralCode = getRandomString(10);
    }

    return newReferralCode;
  } catch (error) {}
};

export const validateEmail = async (email: string) => {
  console.log("validateEmail fired", email);
  try {
    const res = await fetch(`/api/checkEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch user data!");
    }

    return true;
  } catch (error) {
    console.log(error);

    throw error as Error;
  }
};

// General error handler function compatible with Next.js
export const handleError = (
  error: unknown,
  context?: string,
  res?: NextApiResponse,
): never | void => {
  const errorMessage = (msg: string) => (context ? `[${context}] ${msg}` : msg);

  if (error instanceof Error) {
    const formattedMessage = errorMessage(error.message);

    // Differentiating custom error types
    if (error instanceof ValidationError) {
      console.error("Validation Error:", formattedMessage);
    } else if (error instanceof DatabaseError) {
      console.error("Database Error:", formattedMessage, "Query:", error.query);
    } else if (error instanceof NotFoundError) {
      console.error("Not Found:", formattedMessage);
    } else {
      console.error("General Error:", formattedMessage);
    }

    console.error("Stack Trace:", error.stack);

    // If the response object is provided, send a JSON response for API routes
    if (res) {
      return res.status(500).json({ error: formattedMessage });
    }

    // Throw a new error with more context
    throw new Error(`Error: ${formattedMessage}`);
  } else if (typeof error === "string") {
    const formattedMessage = errorMessage(error);
    console.error("Error:", formattedMessage);

    if (res) {
      return res.status(500).json({ error: formattedMessage });
    }

    throw new Error(`Error: ${formattedMessage}`);
  } else if (typeof error === "object" && error !== null) {
    try {
      const errorString = JSON.stringify(error);
      const formattedMessage = errorMessage(`Unknown error: ${errorString}`);
      console.error("Unknown object error:", formattedMessage);

      if (res) {
        return res.status(500).json({ error: formattedMessage });
      }

      throw new Error(formattedMessage);
    } catch (stringifyError) {
      console.error("Failed to stringify the error object:", error);
      throw new Error("Unknown error: Unable to process error object.");
    }
  } else {
    const formattedMessage = errorMessage("An unexpected error occurred.");
    console.error("Unexpected error type:", error);

    if (res) {
      return res.status(500).json({ error: formattedMessage });
    }

    throw new Error(formattedMessage);
  }
};
