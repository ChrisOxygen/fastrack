import { model, models, Schema, Document } from "mongoose";

// TypeScript interface for the TransferTransaction model
export interface ITransferTransaction extends Document {
  amountToRevive: number;
  tax: number;
  reciverEmail: string;
  note?: string;
  transaction: string; // Optional reference to Transaction
}

const transferTransactionSchema = new Schema(
  {
    amountToRevive: {
      type: Number,
      required: [true, "Amount to revive is required"],
    },
    tax: {
      type: Number,
      required: [true, "Tax is required"],
    },
    reciverEmail: {
      type: String,
      required: [true, "Receiver email is required"],
    },
    note: {
      type: String,
    },
    transaction: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  { timestamps: true },
);

// Create or retrieve the existing Mongoose model
const TransferTransaction =
  models?.TransferTransaction ||
  model<ITransferTransaction>("TransferTransaction", transferTransactionSchema);

export default TransferTransaction;
