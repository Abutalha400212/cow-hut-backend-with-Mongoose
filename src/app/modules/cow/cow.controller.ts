import { RequestHandler } from "express";
import { CowService } from "./cow.service";
import httpStatus from "http-status";
import { filterFields, paginationFields } from "./cow.constant";
import pick from "../../../shared/pick";

const addCow: RequestHandler = async (req, res, next) => {
  try {
    const result = await CowService.addCow(req.body);

    res.status(httpStatus.OK).json({
      success: true,
      message: "Cow is added successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
const getAllCow: RequestHandler = async (req, res, next) => {
  try {
    const filters = pick(req.query, filterFields);
    const paginationOtions = pick(req.query, paginationFields);
    const result = await CowService.getAllCow(filters, paginationOtions);
    res.status(httpStatus.OK).json({
      success: true,
      message: "Cows data retrived successfully",
      meta: result.meta,
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const CowController = {
  addCow,
  getAllCow,
};
