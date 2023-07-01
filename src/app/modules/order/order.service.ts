import mongoose, { SortOrder } from "mongoose";
import { Cow } from "../cow/cow.model";
import { User } from "../user/user.model";
import { IOrder } from "./order.interface";
import { Order } from "./order.model";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
import {
  IGenereicResponse,
  IPaginationOptions,
} from "../../../interfaces/common";
import { PaginationHelper } from "../../../helpers/paginationHelpers";
import { IUser } from "../user/user.interface";
import { IAdmin } from "../admin/admin.interface";

const createOrder = async (payload: IOrder): Promise<IOrder | null> => {
  const { cow: cowId, buyer: buyerId } = payload;
  const isBuyer = await User.findById({ _id: buyerId, role: "buyer" });
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
    payload.seller = isCowExist.seller;
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
    result = await Order.findById({ _id: result._id })
      .populate("cow")
      .populate("seller")
      .populate("buyer");
  }

  return result;
};
const getOrders = async (
  user: Pick<IUser | IAdmin, "_id" | "phoneNumber" | "role" | "password">,
  paginationOtions: IPaginationOptions
): Promise<IGenereicResponse<IOrder[]>> => {
  const { _id } = user;

  const { page, limit, sortBy, sortOrder } =
    PaginationHelper.createPagination(paginationOtions);
  const skip = (page - 1) * limit;
  const sortCondition: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  let condition = {};
  if (user.role === "admin") {
    condition = {};
  } else if (user.role === "buyer") {
    condition = { buyer: _id };
  } else if (user.role === "seller") {
    condition = { seller: _id };
  }
  const result = await Order.find(condition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Order.estimatedDocumentCount();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleOrder = async (
  id: string,
  user: Pick<IUser | IAdmin, "_id" | "phoneNumber" | "role" | "password">
): Promise<IOrder | null> => {
  const { _id: userId, role } = user;
  console.log({ userId, role });
  let condition = {};
  if (user.role === "admin") {
    condition = { _id: id };
  } else if (user.role === "buyer") {
    condition = { _id: id, buyer: userId };
  } else if (user.role === "seller") {
    condition = { _id: id, seller: userId };
  }
  const result = await Order.findOne(condition)
    .populate("cow")
    .populate("buyer")
    .populate("seller");

  return result;
};
export const OrderService = {
  createOrder,
  getOrders,
  getSingleOrder,
};
