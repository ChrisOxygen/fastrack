import { Model, Schema, model, Document, models } from "mongoose";

export interface IWithdrawalTransaction extends Document {
  _id: string;
  withdrawalMethod: "USDT" | "BTC";
  deductableAmount: number;
  tax: number;
  walletAddress: string;
  network: string;
  transaction: Schema.Types.ObjectId;
}

const withdrawalTransactionSchema = new Schema<IWithdrawalTransaction>(
  {
    withdrawalMethod: {
      type: String,
      enum: ["USDT", "BTC"],
      required: true,
    },
    deductableAmount: {
      type: Number,
      required: [true, "amount is required"],
    },

    tax: {
      type: Number,
      required: [true, "tax is required"],
    },
    walletAddress: {
      type: String,
      required: [true, "wallet address is required"],
    },
    network: {
      type: String,
      default: "N/A",
      required: [true, "network is required"],
    },

    transaction: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  { timestamps: true },
);

const WithdrawalTransaction =
  models.WithdrawalTransaction ||
  model("WithdrawalTransaction", withdrawalTransactionSchema);

export default WithdrawalTransaction;
