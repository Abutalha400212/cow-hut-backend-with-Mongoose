import { Schema, model } from "mongoose";
import { AdminModel, IAdmin } from "./admin.interface";
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
adminSchema.statics.isAdminExist = async function (
  phoneNumber: string
): Promise<Pick<IAdmin, "_id" | "phoneNumber" | "password" | "role"> | null> {
  return await Admin.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1, needsPasswordChange: 1 }
  );
};

adminSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savedPassword);
};
adminSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});
export const Admin = model<IAdmin, AdminModel>("Admin", adminSchema);
