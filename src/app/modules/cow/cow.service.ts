import { ObjectId, SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelpers";
import { ICow, ICowFilter } from "./cow.interface";
import { Cow } from "./cow.model";
import { FilteringHelper } from "../../../helpers/filteringHelpers";
import {
  IGenereicResponse,
  IPaginationOptions,
} from "../../../interfaces/common";
import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import { User } from "../user/user.model";

const addCow = async (payload: ICow): Promise<ICow> => {
  const isSeller = await User.findOne({ _id: payload?.seller, role: "seller" });
  if (!isSeller) {
    throw new ApiError(httpStatus.BAD_REQUEST, `Only seller can add a cow`);
  }
  const addedCow = await Cow.create(payload);
  return addedCow;
};
const getAllCow = async (
  filters: ICowFilter,
  paginationOtions: IPaginationOptions
): Promise<IGenereicResponse<ICow[]>> => {
  const { page, limit, sortBy, sortOrder } =
    PaginationHelper.createPagination(paginationOtions);
  const skip = (page - 1) * limit;
  const sortCondition: { [key: string]: SortOrder } = {};
  const andConditions = FilteringHelper.CowFilteringHelpers(filters);
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Cow.estimatedDocumentCount(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  const result = await Cow.findById({ _id: id }).populate("seller");
  return result;
};
const deleteSingleCow = async (id: string): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  const result = await Cow.findOneAndDelete({ _id: id });
  return result;
};
const updateSingleCow = async (
  id: string,
  payload: Partial<ICow>
): Promise<ICow | null> => {
  const isExist = await Cow.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found !");
  }
  const updatedCowData: Partial<ICow> = { ...payload };

  const result = await Cow.findOneAndUpdate({ _id: id }, updatedCowData, {
    new: true,
  });
  return result;
};
export const CowService = {
  addCow,
  getAllCow,
  getSingleCow,
  deleteSingleCow,
  updateSingleCow,
};
