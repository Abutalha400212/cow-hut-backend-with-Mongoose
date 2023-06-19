import { ObjectId, SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelpers";
import {
  ICow,
  ICowFilter,
  IGenereicResponse,
  IPaginationOptions,
} from "./cow.interface";
import { Cow } from "./cow.model";
import { FilteringHelper } from "../../../helpers/filteringHelpers";

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
  const { page, limit, sortBy, sortOrder } =
    PaginationHelper.createPagination(paginationOtions);
  const skip = (page - 1) * limit;
  const sortCondition: { [key: string]: SortOrder } = {};
  const andConditions = FilteringHelper.filteringHelpers(filters);
  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  let result: ICow[] = [];
  if (!Object.keys(filters).length) {
    result = await Cow.find().sort(sortCondition).skip(skip).limit(limit);
  } else {
    result = await Cow.find({ $and: andConditions })
      .sort(sortCondition)
      .skip(skip)
      .limit(limit);
  }
  const total = await Cow.estimatedDocumentCount();
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleCow = async (id: string) => {
  const result = await Cow.findOne({ _id: id }).populate("seller");
  return result;
};
const deleteSingleCow = async (id: string) => {
  const result = await Cow.deleteOne({ _id: id });
  return result;
};
const updateSingleCow = async (id: string, update: ICow) => {
  const result = await Cow.updateOne({ _id: id }, update);
  return result;
};
export const CowService = {
  addCow,
  getAllCow,
  getSingleCow,
  deleteSingleCow,
  updateSingleCow,
};
