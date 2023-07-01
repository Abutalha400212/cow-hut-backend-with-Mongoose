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
import { jwtHelpers } from "../../../helpers/JWT.token";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { Admin } from "../admin/admin.model";
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
const getProfile = async (
  token: string
): Promise<Pick<IUser, "name" | "phoneNumber" | "address"> | null> => {
  const { _id, role } = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );
  if (role && role === "admin") {
    throw new ApiError(httpStatus.UNAUTHORIZED, "You can't see admin profile");
  }

  const result = await User.findById(
    { _id },
    { name: 1, phoneNumber: 1, address: 1, _id: 0 }
  );

  return result;
};
const updateProfile = async (
  payload: Partial<IUser>,
  token: string
): Promise<
  Pick<IUser, "name" | "phoneNumber" | "address"> | undefined | null
> => {
  const { _id, role } = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );
  const { name, ...userData } = payload;
  const updatedData: Partial<IUser> = { ...userData };
  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IUser>;

      (updatedData as any)[nameKey] = name[key as keyof typeof name];
    });

    if (role && role === "admin") {
      throw new ApiError(
        httpStatus.UNAUTHORIZED,
        "You can't update an admin profile"
      );
    }

    const result = await User.findOneAndUpdate({ _id }, updatedData, {
      projection: {
        name: true,
        phoneNumber: true,
        address: true,
        _id: false,
      },
      new: true,
    });

    return result;
  }
};
export const UserService = {
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
  getProfile,
  updateProfile,
};
