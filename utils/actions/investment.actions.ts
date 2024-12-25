"use server";

import { InvestmentTransactionType } from "@/types";
import { connectToDatabase } from "../database";
import Investment, { IInvestment } from "../database/models/investment.model";
import { handleError, handleServerError } from "../services";
import { createTransaction } from "./transaction.actions";
import User from "../database/models/user.model";
import { INVESTMENT_PLANS } from "@/constants";

export const getInvestments = async (id: string) => {
  try {
    await connectToDatabase();
    const investments = await Investment.find({ user: id });

    const allInvestments = investments.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return allInvestments ? JSON.parse(JSON.stringify(allInvestments)) : null;
  } catch (error) {
    handleError(error, "getInvestments");
  }
};

export const getInvestment = async (id: string) => {
  try {
    await connectToDatabase();
    const investment = await Investment.findById(id);
    return investment ? JSON.parse(JSON.stringify(investment)) : null;
  } catch (error) {
    handleError(error, "getInvestment");
  }
};

export const getUserInvestments = async (id: string) => {
  try {
    await connectToDatabase();
    const userInvestments = await Investment.find({ user: id }, null, {
      sort: { createdAt: -1 },
    });

    return userInvestments ? JSON.parse(JSON.stringify(userInvestments)) : null;
  } catch (error) {
    handleError(error, "getUserInvestments");
  }
};

export const createInvestment = async (
  investmentDetails: InvestmentTransactionType,
) => {
  const { investmentPackage, amount, userId, status, fee, type } =
    investmentDetails;
  try {
    await connectToDatabase();

    // find the user in the DB

    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }

    // check if the user has enough balance to make the investment

    if (user.balance < amount) {
      throw new Error("Insufficient balance");
    }
    const newTransaction = await createTransaction(investmentDetails);
    // gets the investment package returns from the investment package imported from constants

    const ivReturns =
      amount +
      (INVESTMENT_PLANS.find(
        (plan) => plan.packageName.toLocaleLowerCase() === investmentPackage,
      )!.roiPercent /
        100) *
        amount;

    const investmentObj = {
      investmentPackage: investmentPackage,
      amount: amount,
      user: userId,
      status: "running",
      returns: ivReturns,
    };
    const newInvestment = await Investment.create(investmentObj as IInvestment);
    return newInvestment ? JSON.parse(JSON.stringify(newInvestment)) : null;
  } catch (error) {
    // handleError(error, "createInvestment");
    // handleServerError(error, "createInvestment");

    throw error;
  }
};

export async function updateInvestmentsBasedOnDuration(id: string) {
  console.log("updateInvestmentsBasedOnDuration fired", id);
  try {
    // Get the current date in milliseconds
    const currentDate = new Date().getTime();

    // Prepare an array of conditions based on each investment package's duration
    // const conditions = Object.entries(INVESTMENT_PLANS).map(
    //   ([packageName, { durationDays }]) => {
    //     // Calculate the date before which the investment should have been created to be marked as "completed"
    //     const cutoffDate = new Date(
    //       currentDate - durationDays * 24 * 60 * 60 * 1000,
    //     );
    //     return {
    //       investmentPackage: packageName.toLocaleLowerCase(),
    //       createdAt: { $lte: cutoffDate },
    //     };
    //   },
    // );

    const conditions = INVESTMENT_PLANS.map((plan) => {
      // Calculate the date before which the investment should have been created to be marked as "completed"
      const cutoffDate = new Date(
        currentDate - plan.durationDays * 24 * 60 * 60 * 1000,
      );
      return {
        investmentPackage: plan.packageName.toLocaleLowerCase(),
        createdAt: { $lte: cutoffDate },
      };
    });

    console.log("conditions", conditions);

    const resuls = await Investment.find({
      user: id,
    }).updateMany(
      {
        status: "running",
        user: id,
        $or: conditions,
      },
      { $set: { status: "processing" } },
    );

    console.log("result", resuls);

    // console.log(
    //   `${result.modifiedCount} investment(s) updated to "completed" based on duration.`,
    // );
  } catch (error) {
    console.error("Error updating investments:", error);
  }
}

export async function updateSingleInvestmentBasedOnDuration(id: string) {
  console.log("updateSingleInvestmentBasedOnDuration fired", id);
  try {
    // Get the current date in milliseconds
    const currentDate = new Date().getTime();

    // Prepare an array of conditions based on each investment package's duration
    const conditions = INVESTMENT_PLANS.map((plan) => {
      // Calculate the date before which the investment should have been created to be marked as "completed"
      const cutoffDate = new Date(
        currentDate - plan.durationDays * 24 * 60 * 60 * 1000,
      );
      return {
        investmentPackage: plan.packageName.toLocaleLowerCase(),
        createdAt: { $lte: cutoffDate },
      };
    });

    console.log("conditions", conditions);

    const updatedIv = await Investment.findById(id).updateOne(
      {
        status: "running",
        _id: id,
        $or: conditions,
      },
      { $set: { status: "processing" } },
    );

    console.log("result", updatedIv);
    return updatedIv ? JSON.parse(JSON.stringify(updatedIv)) : null;
  } catch (error) {
    console.error("Error updating investments:", error);
  }
}
