import ApiError from "../../../errors/apiError";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status";
const createUser = async (payload: IUser): Promise<IUser | null> => {
  if (payload.role === "seller" && payload.budget > 0) {
    throw new ApiError(httpStatus.CONFLICT, "Can't have a budget as seller");
  }
  if (payload.role === "buyer" && payload.income > 0) {
    throw new ApiError(httpStatus.CONFLICT, "Can't have an income as Buyer");
  }
  if (payload.role === "seller" && payload.budget > 0) {
    throw new ApiError(httpStatus.CONFLICT, "Can't have a budget as seller");
  }
  const createdUser = await User.create(payload);
  if (!createdUser) {
    throw Error("Failed to create user");
  }
  return createdUser;
};

export const UserService = {
  createUser,
};
