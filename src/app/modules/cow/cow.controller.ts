import { RequestHandler } from "express";
import { CowService } from "./cow.service";
import httpStatus from "http-status";
import { filterFields, paginationFields } from "./cow.constant";
import pick from "../../../shared/pick";
import ApiError from "../../../errors/apiError";

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
const getSingleCow: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    if (typeof id !== "string") {
      throw new ApiError(httpStatus.NOT_FOUND, "Provied Id is not valid");
    }
    const result = await CowService.getSingleCow(id);
    if (result) {
      res.status(httpStatus.OK).json({
        success: true,
        message: "Cows data retrived successfully",
        data: result,
      });
    } else {
      throw new ApiError(httpStatus.NOT_FOUND, "Data Not found");
    }
  } catch (error) {
    next(error);
  }
};
const deleteSingleCow: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    if (typeof id !== "string") {
      throw new ApiError(httpStatus.NOT_FOUND, "Provied Id is not valid");
    }
    const result = await CowService.deleteSingleCow(id);
    if (result.deletedCount > 0) {
      res.status(httpStatus.OK).json({
        success: true,
        message: "Cow is deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};
const updateSingleCow: RequestHandler = async (req, res, next) => {
  try {
    const id: string = req.params.id;
    if (typeof id !== "string") {
      throw new ApiError(httpStatus.NOT_FOUND, "Provied Id is not valid");
    }
    const result = await CowService.updateSingleCow(id, req.body);

    if (result.modifiedCount > 0) {
      res.status(httpStatus.OK).json({
        success: true,
        message: "Cow has updeted successfully",
        data: req.body,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const CowController = {
  addCow,
  getAllCow,
  getSingleCow,
  deleteSingleCow,
  updateSingleCow,
};
