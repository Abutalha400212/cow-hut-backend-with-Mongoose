import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";

const orderSchema = new Schema<IOrder>({
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
  cow: { type: Schema.Types.ObjectId, ref: "Cow" },
  seller: { type: Schema.Types.ObjectId, ref: "User" },
});
export const Order = model<IOrder>("Order", orderSchema);
