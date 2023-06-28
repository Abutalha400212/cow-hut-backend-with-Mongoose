import mongoose from "mongoose";
import { Cow } from "../cow/cow.model";
import { User } from "../user/user.model";
import { IOrder, IOrderResponse } from "./order.interface";
import { Order } from "./order.model";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";

const createOrder = async (payload: IOrder): Promise<IOrderResponse | null> => {
  const { cow: cowId, buyer: buyerId } = payload;

  const isBuyer = await User.findOne({ _id: buyerId, role: "buyer" });
  if (!isBuyer) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Only Buyer can buy a cow");
  }
  const isCowExist = await Cow.findById({ _id: cowId });
  if (!isCowExist) {
    throw new ApiError(httpStatus.BAD_REQUEST, "Cow does not Found");
  }
  let result: any = null;
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    if (isBuyer.budget < isCowExist.price) {
      throw new ApiError(httpStatus.BAD_GATEWAY, "Insufficient Balance");
    }
    await User.findOneAndUpdate(
      { _id: buyerId },
      { $inc: { budget: -Number(isCowExist?.price) } },
      { new: true, session: session }
    );
    await User.findOneAndUpdate(
      { _id: isCowExist.seller },
      { $inc: { income: Number(isCowExist?.price) } },
      { new: true, session: session }
    );
    if (isCowExist.label === "sold-out") {
      throw new ApiError(httpStatus.BAD_REQUEST, "This Cow already has sold");
    }
    await Cow.findOneAndUpdate(
      { _id: cowId },
      { $set: { label: "sold-out" } },
      { new: true, session: session }
    );
    const createOrder = await Order.create([payload], { session: session });
    if (!createOrder.length) {
      throw new ApiError(httpStatus.BAD_REQUEST, "Failed to create a user");
    }
    result = createOrder[0];
    await session.commitTransaction();
    await session.endSession();
  } catch (error) {
    await session.abortTransaction();
    await session.endSession();
    throw error;
  }
  if (result) {
    result = await Cow.findOne({ _id: result.cow }).populate("seller");
  }

  return result;
};

export const OrderService = {
  createOrder,
};
