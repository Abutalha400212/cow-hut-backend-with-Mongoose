import { Request, Response } from "express";
import { CowService } from "./cow.service";
import httpStatus from "http-status";
import { filterFields, paginationFields } from "./cow.constant";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";
import { ICow } from "./cow.interface";

const addCow = catchAsync(async (req: Request, res: Response) => {
  const result = await CowService.addCow(req.body);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow Added successfully",
    data: result,
  });
});
const getAllCow = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, filterFields);
  const paginationOtions = pick(req.query, paginationFields);
  const result = await CowService.getAllCow(filters, paginationOtions);
  sendResponse<ICow[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow data retrived successfully",
    meta: result.meta,
    data: result.data,
  });
});
const getSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id: string = req.params.id;
  const result = await CowService.getSingleCow(id);
  if (result) {
    sendResponse<ICow>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Cow data retrived successfully",
      data: result,
    });
  }
});
const deleteSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.deleteSingleCow(id);

  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow Deleted successfully",
    data: result,
  });
});
const updateSingleCow = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await CowService.updateSingleCow(id, req.body);
  sendResponse<ICow>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Cow updated successfully",
    data: result,
  });
});

export const CowController = {
  addCow,
  getAllCow,
  getSingleCow,
  deleteSingleCow,
  updateSingleCow,
};
