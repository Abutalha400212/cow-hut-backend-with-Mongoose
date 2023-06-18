import mongoose, { Schema, model } from "mongoose";
import { IUser } from "./user.interface";

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
    },
    address: String,
    budget: Number,
    income: Number,
  },
  {
    timestamps: true,
  }
);

export const User = model<IUser>("User", userSchema);

// userSchema.post("save", function (error, doc, next) {
//   if (error.name === "MongoError" && error.code === 11000) {
//     next(new Error("There was a duplicate key error"));
//   } else {
//     next();
//   }
// });
