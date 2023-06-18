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

export const UserController = {
  createUser,
};
