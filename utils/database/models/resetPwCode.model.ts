import { model, models, Schema, Document } from "mongoose";

// TypeScript interface for the User model
export interface IResetPwCode extends Document {
  hashedCode: string;
  userId: string;
}

const userSchema = new Schema(
  {
    hashedCode: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true },
);

// Create or retrieve the existing Mongoose model
const ResetPwCode =
  models?.ResetPwCode || model<IResetPwCode>("ResetPwCode", userSchema);

export default ResetPwCode;
