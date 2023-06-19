import { RequestHandler } from "express";
import { OrderService } from "./order.service";
import httpStatus from "http-status";
import { IOrder } from "./order.interface";

const createOrder: RequestHandler = async (req, res, next) => {
  try {
    const result = await OrderService.createOrder(req.body);

    res.status(httpStatus.OK).json({
      success: true,
      message: "Order is created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getOrders: RequestHandler = async (req, res, next) => {
  try {
    const result = await OrderService.getOrders();

    res.status(httpStatus.OK).json({
      success: true,
      message: "Order retrived successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const OrderController = {
  createOrder,
};
