"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    buyer: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
    cow: { type: mongoose_1.Schema.Types.ObjectId, ref: "Cow" },
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
exports.Order = (0, mongoose_1.model)("Order", orderSchema);
