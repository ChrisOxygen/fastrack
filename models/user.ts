import { Model, Schema, model, Document, models } from "mongoose";

// export type UserT = {
//   firstName: string;
//   lastName: string;
//   email: string;
//   password: string;
//   referralCode: string;
// };

export type UserT = {
  firstName: {
    type: StringConstructor;
    required: boolean;
  };
  lastName: {
    type: StringConstructor;
    required: boolean;
  };
  email: {
    type: StringConstructor;
    unique: boolean;
    required: boolean;
  };
  password: {
    type: StringConstructor;
    required: boolean;
  };
  balance: {
    type: NumberConstructor;
    default: number;
  };
  referralCode: {
    type: StringConstructor;
    unique: boolean;
  };
};

export type UserMethods = UserT & Document;

export type UserModel = Model<UserMethods>;

// const userSchema: Schema<UserMethods>

const userSchema: Schema<UserMethods> = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: [true, "Last Name is required"],
    },
    email: {
      type: String,
      unique: [true, "Email already exists"],
      required: [true, "Email is required"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
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
  { timestamps: true }
);

const User = models?.User || model<UserMethods, UserModel>("User", userSchema);

export default User;
