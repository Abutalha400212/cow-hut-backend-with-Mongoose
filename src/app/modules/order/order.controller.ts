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
    const result = await OrderService.getOrders(user, paginationOtions);
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

export const OrderController = {
  createOrder,
  getOrders,
};
