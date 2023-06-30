import { Schema, model } from "mongoose";
import { IUser, UserModel } from "./user.interface";
import bcrypt from "bcrypt";
import config from "../../../config";

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
    budget: { type: Number, default: 0 },
    income: { type: Number, default: 0 },
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
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
export const User = model<IUser, UserModel>("User", userSchema);
