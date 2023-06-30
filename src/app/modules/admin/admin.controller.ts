import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { paginationFields } from "../cow/cow.constant";
import { AdminService } from "./admin.service";
import { IAdmin } from "./admin.interface";
import { AdminFilterFields } from "./admin.constant";
const createAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.createAdmin(req.body);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Created successfully",
    data: result,
  });
});
const getAllAdmin = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, AdminFilterFields);
  const paginationOtions = pick(req.query, paginationFields);
  const result = await AdminService.getAllAdmin(filters, paginationOtions);
  sendResponse<IAdmin[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admins retrived successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getSingleAdmin(req.params.id);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin retrived successfully",
    data: result,
  });
});
const deleteSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.deleteAdmin(req.params.id);
  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin deleted successfully",
    data: result,
  });
});
const updateSingleAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.updateAdmin(req.params.id, req.body);

  sendResponse<IAdmin>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Admin Updated successfully",
    data: result,
  });
});
export const AdminController = {
  createAdmin,
  getAllAdmin,
  getSingleAdmin,
  deleteSingleAdmin,
  updateSingleAdmin,
};
