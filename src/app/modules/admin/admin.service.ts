import { SortOrder } from "mongoose";
import { PaginationHelper } from "../../../helpers/paginationHelpers";
import { FilteringHelper } from "../../../helpers/filteringHelpers";
import {
  IGenereicResponse,
  IPaginationOptions,
} from "../../../interfaces/common";
import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import {
  IAdmin,
  IAdminFilter,
  IAuthAdmin,
  IAuthAdminResponse,
} from "./admin.interface";
import { Admin } from "./admin.model";
import { jwtHelpers } from "../../../helpers/JWT.token";
import { Secret } from "jsonwebtoken";
import config from "../../../config";

const createAdmin = async (payload: IAdmin): Promise<IAdmin> => {
  payload.role = "admin";
  const result = await Admin.create(payload);
  return result;
};
const loginAdmin = async (payload: IAuthAdmin): Promise<IAuthAdminResponse> => {
  const { phoneNumber: contactId, password } = payload;
  const isAdminExist = await Admin.isAdminExist(contactId);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin does not Found");
  }
  const isPasswordMatched = await Admin.isPasswordMatched(
    password,
    isAdminExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password is inCorrect");
  }

  const { phoneNumber, role, _id } = isAdminExist;
  const accessToken = jwtHelpers.createToken(
    { phoneNumber, role, _id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { phoneNumber, role, _id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    role,
    refreshToken,
  };
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
  loginAdmin,
};
