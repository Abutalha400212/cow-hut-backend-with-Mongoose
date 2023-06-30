import { Schema, model } from "mongoose";
import { AuthModel, IAuth } from "./auth.interface";

const authSchema = new Schema<IAuth>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Faculty = model<IAuth, AuthModel>("Auth", authSchema);
