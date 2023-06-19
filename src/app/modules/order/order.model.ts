import { Schema, model } from "mongoose";
import { IOrder } from "./order.interface";
import { IUser } from "../user/user.interface";
import { ICow } from "../cow/cow.interface";
import { Cow } from "../cow/cow.model";
import { User } from "../user/user.model";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const orderSchema = new Schema<IOrder>({
  buyer: { type: Schema.Types.ObjectId, ref: "User" },
  cow: { type: Schema.Types.ObjectId, ref: "Cow" },
});
// orderSchema.pre("save", async function (next) {
//   const { buyer, cow }: any = await Order.findOne({
//     cow: this.cow,
//     buyer: this.buyer,
//   })
//     .sort({ createdAt: -1 })
//     .populate("buyer")
//     .populate("cow");

//   //   if (buyer && cow && buyer.budget >= cow.price) {
//   //     await Order.updateOne(
//   //       { _id: this._id },
//   //       {
//   //         $inc: {
//   //           "buyer.budget": Number(cow.price),
//   //         },
//   //       }
//   //     );
//   //   } else {
//   //     throw new ApiError(httpStatus.BAD_REQUEST, "Insufficient Balance");
//   //   }
//   console.log(buyer, cow);
// });
export const Order = model<IOrder>("Order", orderSchema);
