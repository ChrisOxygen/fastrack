import { model, models, Schema, Document } from "mongoose";

// TypeScript interface for the User model
export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  balance?: number;
  referralCode?: string;
}

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    balance: {
      type: Number,
      default: 0,
    },
    referralCode: {
      type: String,
      unique: true,
    },
  },
  { timestamps: true },
);

// Create or retrieve the existing Mongoose model
const User = models?.User || model<IUser>("User", userSchema);

export default User;
