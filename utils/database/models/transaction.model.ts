import { model, models, Schema, Document } from "mongoose";

// TypeScript interface matching the Mongoose schema style
export interface ITransaction extends Document {
  transactionId: string;
  type:
    | "deposit"
    | "withdrawal"
    | "transfer"
    | "signup bonus"
    | "referral bonus"
    | "investment deposit"
    | "investment payout";
  amount: number;
  status: "pending" | "success" | "error";
  fee: number;
  user: string;
}

const transactionSchema = new Schema(
  {
    transactionId: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: [
        "deposit",
        "withdrawal",
        "transfer",
        "signup bonus",
        "referral bonus",
        "investment deposit",
        "investment payout",
      ],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "success", "error"],
      required: true,
    },
    fee: {
      type: Number,
      required: true,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true },
);

// Create or retrieve the existing Mongoose model
const Transaction =
  models?.Transaction || model<ITransaction>("Transaction", transactionSchema);

export default Transaction;
