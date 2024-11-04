"use server";

import { InvestmentTransactionType } from "@/types";
import { connectToDatabase } from "../database";
import Investment, { IInvestment } from "../database/models/investment.model";
import { handleError } from "../services";
import { createTransaction } from "./transaction.actions";
import User from "../database/models/user.model";

export const getInvestments = async () => {
  try {
    await connectToDatabase();
    const investments = await Investment.find();
    console.log("investments", investments);
    const allInvestments = investments.sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    console.log("allInvestments", allInvestments);
    return allInvestments ? JSON.parse(JSON.stringify(allInvestments)) : null;
  } catch (error) {
    handleError(error, "getInvestments");
  }
};

export const getInvestment = async (id: string) => {
  try {
    await connectToDatabase();
    const investment = await Investment.findOne({ _id: id });
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

    console.log("userInvestments", userInvestments);

    return userInvestments ? JSON.parse(JSON.stringify(userInvestments)) : null;
  } catch (error) {
    handleError(error, "getUserInvestments");
  }
};

export const createInvestment = async (
  investmentDetails: InvestmentTransactionType,
) => {
  const { transactionTier, amount, userId, status, fee, type } =
    investmentDetails;
  try {
    await connectToDatabase();
    const newTransaction = await createTransaction(investmentDetails);
    const investmentObj = {
      investmentTier: transactionTier,
      amount: amount,
      user: userId,
      status: "running",
      returns: amount + amount * 0.2,
    };
    const newInvestment = await Investment.create(investmentObj as IInvestment);
    return newInvestment ? JSON.parse(JSON.stringify(newInvestment)) : null;
  } catch (error) {
    handleError(error, "createInvestment");
  }
};
