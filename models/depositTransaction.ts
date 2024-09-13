import { Model, Schema, model, Document, models } from "mongoose";

export type DepositTransactionT = {
  amountToRevive: {
    type: Number;
    required: [true, string];
  };
  tax: {
    type: Number;
    required: [true, string];
  };
  transferMethod: {
    type: String;
    required: [true, string];
  };

  transaction: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
};

export type DepositTransactionMethods = DepositTransactionT & Document;

export type TransactionModel = Model<DepositTransactionMethods>;

const depositTransactionSchema: Schema<DepositTransactionMethods> = new Schema(
  {
    amountToRevive: {
      type: Number,
      required: [true, "amount is required"],
    },
    tax: {
      type: Number,
      required: [true, "amount is required"],
    },
    transferMethod: {
      type: String,
      required: [true, "amount is required"],
    },
    transaction: {
      type: Schema.Types.ObjectId,
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

const DepositTransaction =
  models.DepositTransaction ||
  model<DepositTransactionMethods>(
    "DepositTransaction",
    depositTransactionSchema
  );

export default DepositTransaction;
