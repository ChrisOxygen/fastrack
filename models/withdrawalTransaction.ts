import { Model, Schema, model, Document, models } from "mongoose";

export type WithdrawalTransactionT = {
  withdrawalMethod: {
    type: String;
    enum: ["paypal", "bank"];
    required: [true, string];
  };
  deductableAmount: {
    type: Number;
    required: [true, string];
  };
  tax: {
    type: Number;
    required: [true, string];
  };

  payPalEmail: {
    type: String;
  };
  bankName: {
    type: String;
  };
  accountNumber: {
    type: String;
  };
  accountName: {
    type: String;
  };

  transaction: {
    type: Schema.Types.ObjectId;
    ref: string;
  };
};

export type WithdrawalTransactionMethods = WithdrawalTransactionT & Document;

export type WithdrawalTransactionModel = Model<WithdrawalTransactionMethods>;

const withdrawalTransactionSchema: Schema<WithdrawalTransactionMethods> =
  new Schema(
    {
      withdrawalMethod: {
        type: String,
        enum: ["paypal", "bank"],
        required: [true, "withdrawal method is required"],
      },
      deductableAmount: {
        type: Number,
        required: [true, "amount is required"],
      },
      tax: {
        type: Number,
        required: [true, "amount is required"],
      },
      payPalEmail: {
        type: String,
      },
      bankName: {
        type: String,
      },
      accountNumber: {
        type: String,
      },
      accountName: {
        type: String,
      },

      transaction: {
        type: Schema.Types.ObjectId,
        ref: "Transaction",
      },
    },
    { timestamps: true }
  );

const WithdrawalTransaction =
  models.WithdrawalTransaction ||
  model<WithdrawalTransactionMethods>(
    "WithdrawalTransaction",
    withdrawalTransactionSchema
  );

export default WithdrawalTransaction;
