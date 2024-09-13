import { Model, Schema, model, Document, models } from "mongoose";

export type TransactionT = {
  transactionId: {
    type: String;
    required: [true, string];
  };
  type: {
    type: String;
    enum: string[];
    required: [true, string];
  };
  amount: {
    type: Number;
    required: [true, string];
  };
  status: {
    type: String;
    enum: string[];
    required: [true, string];
  };
  fee: {
    type: Number;
    required: [true, string];
  };
  user: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
};

export type TransactionMethods = TransactionT & Document;

export type TransactionModel = Model<TransactionMethods>;

const transactionSchema: Schema<TransactionMethods> = new Schema(
  {
    transactionId: {
      type: String,
      required: [true, "id is required"],
    },
    type: {
      type: String,
      enum: [
        "deposit",
        "withdrawal",
        "transfer",
        "signup bonus",
        "referral bonus",
      ],
      required: [true, "transaction type is required"],
    },
    amount: {
      type: Number,
      required: [true, "amount is required"],
    },
    status: {
      type: String,
      enum: ["pending", "success", "error"],
      required: [true, "status is required"],
    },
    fee: {
      type: Number,
      required: [true, "fee is required"],
    },

    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Transaction =
  models.Transaction ||
  model<TransactionMethods>("Transaction", transactionSchema);

export default Transaction;
