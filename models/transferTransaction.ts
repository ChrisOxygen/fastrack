import { Model, Schema, model, Document, models } from "mongoose";

export type TransferTransactionT = {
  amountToRevive: {
    type: Number;
    required: [true, string];
  };
  tax: {
    type: Number;
    required: [true, string];
  };

  reciverEmail: {
    type: String;
    required: [true, string];
  };
  note: {
    type: String;
  };

  transaction: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
};

export type TransferTransactionMethods = TransferTransactionT & Document;

export type TransactionModel = Model<TransferTransactionMethods>;

const transferTransactionSchema: Schema<TransferTransactionMethods> =
  new Schema(
    {
      amountToRevive: {
        type: Number,
        required: [true, "amount is required"],
      },
      tax: {
        type: Number,
        required: [true, "amount is required"],
      },
      reciverEmail: {
        type: String,
        required: [true, "reciver email is required"],
      },
      note: {
        type: String,
      },
      transaction: {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    },
    { timestamps: true }
  );

const TransferTransaction =
  models.TransferTransaction ||
  model<TransferTransactionMethods>(
    "TransferTransaction",
    transferTransactionSchema
  );

export default TransferTransaction;
