import { Request, RequestHandler, Response } from "express";
import { OrderService } from "./order.service";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ICow } from "../cow/cow.interface";
import { paginationFields } from "../cow/cow.constant";
import pick from "../../../shared/pick";
import { IOrder } from "./order.interface";
import ApiError from "../../../errors/apiError";
import { IUser } from "../user/user.interface";
import { IAdmin } from "../admin/admin.interface";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const { ...orderData } = req.body;
  const result = await OrderService.createOrder(orderData);
  sendResponse<IOrder>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Created successfully",
    data: result,
  });
});
const getOrders: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOtions = pick(req.query, paginationFields);
    const { ...user } = req?.user;
    const result = await OrderService.getOrders(
      user as Pick<IUser | IAdmin, "_id" | "phoneNumber" | "role" | "password">,
      paginationOtions
    );
    // Check specific User for existed Order
    if (!result.data.length && user.role !== "admin") {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Your are not a seller/buyer for this order"
      );
    }
    if (!result.data.length && user.role === "admin") {
      throw new ApiError(httpStatus.NOT_FOUND, "Data is not found");
    }
    sendResponse<IOrder[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order retrived successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);
const getSingleOrder: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const { ...user } = req?.user;
    const result = await OrderService.getSingleOrder(
      id,
      user as Pick<IUser | IAdmin, "_id" | "phoneNumber" | "role" | "password">
    );
    // Check specific User for existed Order
    if (!result && user.role !== "admin") {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Your are not a seller/buyer for this order"
      );
    }
    if (!result && user.role === "admin") {
      throw new ApiError(httpStatus.NOT_FOUND, "Data is not found");
    }
    sendResponse<IOrder>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Order retrived successfully",
      data: result,
    });
  }
);

export const OrderController = {
  createOrder,
  getOrders,
  getSingleOrder,
};
