import { model, models, Schema, Document } from "mongoose";

// TypeScript interface for the DepositTransaction model
export interface IDepositTransaction extends Document {
  amountToReceive: number;
  tax: number;
  transferMethod: string;
  transaction?: string;
}

const depositTransactionSchema = new Schema<IDepositTransaction>(
  {
    amountToReceive: {
      type: Number,
      required: [true, "Amount to revive is required"],
    },
    tax: {
      type: Number,
      required: [true, "Tax is required"],
    },
    transferMethod: {
      type: String,
      required: [true, "Transfer method is required"],
    },
    transaction: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  { timestamps: true },
);

// Create or retrieve the existing Mongoose model
const DepositTransaction =
  models?.DepositTransaction ||
  model<IDepositTransaction>("DepositTransaction", depositTransactionSchema);

export default DepositTransaction;
