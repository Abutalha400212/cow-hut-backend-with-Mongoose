import { ObjectId, SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelpers";
import { FilteringHelper } from "../../../helpers/filteringHelpers";
import {
  IGenereicResponse,
  IPaginationOptions,
} from "../../../interfaces/common";
import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import { User } from "../user/user.model";
import { IAdmin, IAdminFilter } from "./admin.interface";
import { Admin } from "./admin.model";

const createAdmin = async (payload: IAdmin): Promise<IAdmin> => {
  payload.role = "admin";
  const result = await Admin.create(payload);
  return result;
};
const getAllAdmin = async (
  filters: IAdminFilter,
  paginationOtions: IPaginationOptions
): Promise<IGenereicResponse<IAdmin[]>> => {
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

  const result = await Admin.find(whereConditions)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await Admin.estimatedDocumentCount(whereConditions);
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleAdmin = async (id: string): Promise<IAdmin | null> => {
  const isExist = await Admin.findById({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found !");
  }
  const result = await Admin.findById({ _id: id });
  return result;
};
const deleteAdmin = async (id: string): Promise<IAdmin | null> => {
  const isExist = await Admin.findById({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin not found !");
  }
  const result = await Admin.findOneAndDelete({ _id: id });
  return result;
};
const updateAdmin = async (
  id: string,
  payload: Partial<IAdmin>
): Promise<IAdmin | null> => {
  const isExist = await Admin.findOne({ _id: id });
  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin is not found !");
  }
  const { name, ...adminData } = payload;
  const updatedAdminData: Partial<IAdmin> = { ...adminData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach((key) => {
      const nameKey = `name.${key}` as keyof Partial<IAdmin>;

      (updatedAdminData as any)[nameKey] = name[key as keyof typeof name];
    });
  }
  const result = await Admin.findOneAndUpdate({ _id: id }, updatedAdminData, {
    new: true,
  });
  return result;
};
export const AdminService = {
  createAdmin,
  getSingleAdmin,
  getAllAdmin,
  updateAdmin,
  deleteAdmin,
};
