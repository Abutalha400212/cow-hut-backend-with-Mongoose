import { Schema, model } from "mongoose";
import { IAdmin } from "./admin.interface";
import bcrypt from "bcrypt";
import config from "../../../config";
const adminSchema = new Schema<IAdmin>(
  {
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["admin"],
    },
    name: {
      firstName: String,
      lastName: String,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    address: String,
  },
  {
    timestamps: true,
  }
);
adminSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
export const Admin = model<IAdmin>("Admin", adminSchema);
