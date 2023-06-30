import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const userSchema = new Schema<IUser>(
  {
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["buyer", "seller"],
    },
    name: {
      firstName: String,
      lastName: String,
    },
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    address: String,
    budget: Number,
    income: Number,
  },
  {
    timestamps: true,
  }
);
userSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<IUser, "_id" | "phoneNumber" | "password" | "role"> | null> {
  return await User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 }
  );
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.role === "seller" && (user.budget > 0 || user.income > 0)) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      "Can't be able to add budget/income as a seller"
    );
  }
  if (user.role === "buyer" && user.income > 0) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      "Can't be able to add income as a buyer"
    );
  }
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
export const User = model<IUser, UserModel>("User", userSchema);
