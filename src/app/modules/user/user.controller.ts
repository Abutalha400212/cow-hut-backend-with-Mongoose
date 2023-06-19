import { RequestHandler } from "express";
import { UserService } from "./user.service";
import httpStatus from "http-status";
const createUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.createUser(req.body);

    res.status(httpStatus.OK).json({
      success: true,
      message: "User Created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

const getAllUsers: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.getAllUsers();
    if (result.length) {
      res.status(httpStatus.OK).json({
        success: true,
        message: "User retrived successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};
const getSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.getSingleUser(req.params.id);
    if (result) {
      res.status(httpStatus.OK).json({
        success: true,
        message: "User retrived successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};
const deleteSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.deleteSingleUser(req.params.id);
    if (result.deletedCount > 0) {
      res.status(httpStatus.OK).json({
        success: true,
        message: "User deleted successfully",
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
};
const updateSingleUser: RequestHandler = async (req, res, next) => {
  try {
    const result = await UserService.updateSingleUser(req.params.id, req.body);
    if (result.modifiedCount > 0) {
      res.status(httpStatus.OK).json({
        success: true,
        message: "User updated successfully",
        data: req.body,
      });
    }
  } catch (error) {
    next(error);
  }
};

export const UserController = {
  createUser,
  getAllUsers,
  getSingleUser,
  deleteSingleUser,
  updateSingleUser,
};
