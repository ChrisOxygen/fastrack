import { model, models, Schema, Document } from "mongoose";

// TypeScript interface matching the Mongoose schema style
export interface IInvestment extends Document {
  investmentTier: "silver" | "gold" | "platinum";
  amount: number;
  status: "running" | "completed";
  returns?: number;

  user: string;
}

const investmentSchema = new Schema(
  {
    investmentTier: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    returns: {
      type: Number,
      default: 0,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true },
);

// Create or retrieve the existing Mongoose model
const Investment =
  models?.Investment || model<IInvestment>("Investment", investmentSchema);

export default Investment;
