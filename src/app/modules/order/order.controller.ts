import { Request, Response } from "express";
import { OrderService } from "./order.service";
import httpStatus from "http-status";
import { IOrderResponse } from "./order.interface";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderService.createOrder(req.body);
  sendResponse<IOrderResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Created successfully",
    data: result,
  });
});
// const getOrders: RequestHandler = catchAsync(
//   async (req: Request, res: Response, next: NextFunction) => {
//     const result = await OrderService.getOrders();
//     sendResponse(res, {
//       statusCode: httpStatus.OK,
//       success: true,
//       message: "Order retrived successfully",
//       data: result,
//     });
//     next();
//   }
// );

export const OrderController = {
  createOrder,
};
