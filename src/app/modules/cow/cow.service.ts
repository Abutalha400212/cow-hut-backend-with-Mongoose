import { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelpers";
import {
  ICow,
  ICowFilter,
  IGenereicResponse,
  IPaginationOptions,
} from "./cow.interface";
import { Cow } from "./cow.model";

const addCow = async (payload: ICow) => {
  const addedCow = await Cow.create(payload);

  if (!addedCow) {
    throw new Error("Cow is not added");
  }
  return addedCow;
};

const getAllCow = async (
  filters: ICowFilter,
  paginationOtions: IPaginationOptions
): Promise<IGenereicResponse<ICow[]>> => {
  const { searchTerm } = filters;
  const { page, limit, sortBy, sortOrder } =
    PaginationHelper.createPagination(paginationOtions);
  const skip = (page - 1) * limit;
  const sortCondition: { [key: string]: SortOrder } = {};
  const andConditions = [];
  const academicSemesterSearchableFields = ["location", "greed", "category"];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await Cow.find({ $and: andConditions })
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  const total = await Cow.countDocuments();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
export const CowService = {
  addCow,
  getAllCow,
};
