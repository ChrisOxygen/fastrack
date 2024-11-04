import { model, models, Schema, Document } from "mongoose";

// TypeScript interface for the WithdrawalTransaction model
export interface IWithdrawalTransaction extends Document {
  withdrawalMethod: "USDT" | "BTC";
  deductableAmount: number;
  tax: number;
  walletAddress: string;
  network?: string;
  transaction: string; // Optional reference to Transaction
}

const withdrawalTransactionSchema = new Schema(
  {
    withdrawalMethod: {
      type: String,
      enum: ["USDT", "BTC"],
      required: [true, "Withdrawal method is required"],
    },
    deductableAmount: {
      type: Number,
      required: [true, "Deductable amount is required"],
    },
    tax: {
      type: Number,
      required: [true, "Tax is required"],
    },
    walletAddress: {
      type: String,
      required: [true, "Wallet address is required"],
    },
    network: {
      type: String,
      default: "N/A",
      required: [true, "Network is required"],
    },
    transaction: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  { timestamps: true },
);

// Create or retrieve the existing Mongoose model
const WithdrawalTransaction =
  models.WithdrawalTransaction ||
  model<IWithdrawalTransaction>(
    "WithdrawalTransaction",
    withdrawalTransactionSchema,
  );

export default WithdrawalTransaction;
