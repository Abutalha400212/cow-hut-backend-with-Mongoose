import { SortOrder } from "mongoose";
import { FilteringHelper } from "../../../helpers/filteringHelpers";
import { PaginationHelper } from "../../../helpers/paginationHelpers";
import {
  IGenereicResponse,
  IPaginationOptions,
} from "../../../interfaces/common";
import { IUser, IUserFilter } from "./user.interface";
import { User } from "./user.model";
import ApiError from "../../../errors/apiError";
import httpStatus from "http-status";
const createUser = async (payload: IUser): Promise<IUser | null> => {
  const createdUser = await User.create(payload);
  return createdUser;
};
const getAllUsers = async (
  filters: IUserFilter,
  paginationOtions: IPaginationOptions
): Promise<IGenereicResponse<IUser[]>> => {
  const { page, limit, sortBy, sortOrder } =
    PaginationHelper.createPagination(paginationOtions);
  const skip = (page - 1) * limit;
  const sortCondition: { [key: string]: SortOrder } = {};
  const andConditions = FilteringHelper.UserFilteringHelpers(filters);
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await User.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await User.estimatedDocumentCount();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getSingleUser = async (id: string): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  const result = await User.findById({ _id: id });
  return result;
};
const deleteSingleUser = async (id: string): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  const result = await User.findOneAndDelete({ _id: id });
  return result;
};
const updateSingleUser = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const isExist = await User.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  const { name, ...userData } = payload;
  const updatedUserData: Partial<IUser> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;

      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true,
  });
  return result;
};
export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
};
