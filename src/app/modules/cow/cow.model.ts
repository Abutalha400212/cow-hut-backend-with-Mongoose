import mongoose, { Schema, model } from "mongoose";
import { ICow } from "./cow.interface";
import { breeds, divisions } from "./cow.constant";

const cowSchema = new Schema<ICow>({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    required: true,
    enum: divisions,
  },
  breed: {
    type: String,
    required: true,
    enum: breeds,
  },
  weight: {
    type: Number,
    required: true,
  },
  label: {
    type: String,
    required: true,
    enum: ["for-sale", "sold-out"],
  },
  category: {
    type: String,
    required: true,
    enum: ["dairy", "beef", "dualPurpose"],
  },
  seller: { type: Schema.Types.ObjectId, ref: "User" },
});

export const Cow = model<ICow>("Cow", cowSchema);
