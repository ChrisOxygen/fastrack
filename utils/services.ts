"use client";

import { signIn } from "next-auth/react";
import { revalidatePath } from "next/cache";

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
import { ErrorWithMessageAndStatus, userLoginDetailsType } from "@/types";
import User from "./database/models/user.model";
import { CustomFormError } from "@/lib/utils";

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

export const loginUser = async (userDetails: userLoginDetailsType) => {
  const { email, password } = userDetails;

  console.log("loginUser fired", userDetails);

  try {
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    console.log("res", res);

    if (res && !res.ok) {
      throw new Error(res.error!);
    }
    return res;
  } catch (error) {
    throw error as Error;
    // handleError(error, "loginUser");
  }
};

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

export function getReadableDuration(targetDate: Date): string {
  const now = new Date();
  const diff = targetDate.getTime() - now.getTime();

  if (diff <= 0) return "Expired";

  const seconds = Math.floor((diff / 1000) % 60);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} day${days > 1 ? "s" : ""}`);
  if (hours > 0) parts.push(`${hours} hour${hours > 1 ? "s" : ""}`);
  if (minutes > 0) parts.push(`${minutes} minute${minutes > 1 ? "s" : ""}`);
  if (seconds > 0) parts.push(`${seconds} second${seconds > 1 ? "s" : ""}`);

  return parts.join(", ");
}

export function formatToUSD(amount: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(amount);
}

export const handleServerError = (
  error: unknown,
  context?: string,
): { error: string; code: number } => {
  const errorMessage = (msg: string) => (context ? `[${context}] ${msg}` : msg);

  let formattedMessage: string;
  let statusCode = 500; // Default to internal server error

  if (error instanceof Error) {
    formattedMessage = errorMessage(error.message);

    if (error instanceof ValidationError) {
      statusCode = 400; // Bad request
      console.error("Validation Error:", formattedMessage);
    } else if (error instanceof NotFoundError) {
      statusCode = 404; // Not found
      console.error("Not Found:", formattedMessage);
    } else {
      console.error("General Error:", formattedMessage);
    }
  } else if (typeof error === "string") {
    formattedMessage = errorMessage(error);
    console.error("Error:", formattedMessage);
  } else {
    formattedMessage = errorMessage("Unknown error occurred.");
    console.error("Unknown error type:", error);
  }

  // Return error response (instead of using res, return an object)
  return { error: formattedMessage, code: statusCode };
};
