import { Request, Response } from "express";
import { UserService } from "./user.service";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { IUser } from "./user.interface";
import { paginationFields } from "../cow/cow.constant";
import { UserFilterFields } from "./user.constant";
const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created successfully",
    data: result,
  });
});
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, UserFilterFields);
  const paginationOtions = pick(req.query, paginationFields);
  const result = await UserService.getAllUsers(filters, paginationOtions);
  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow data retrived successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getSingleUser(req.params.id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User retrived successfully",
    data: result,
  });
});
const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.deleteSingleUser(req.params.id);
  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User deleted successfully",
    data: result,
  });
});
const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.updateSingleUser(req.params.id, req.body);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Updated successfully",
    data: result,
  });
});
export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
};
