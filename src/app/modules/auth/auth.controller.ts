import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { AuthService } from "./auth.service";
import sendResponse from "../../../shared/sendResponse";
import { IAuthUserResponse, IRefreshTokenResponse } from "./auth.interface";
import httpStatus from "http-status";
import config from "../../../config";

const loginAdmin = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginAdmin(req.body);
  const { refreshToken, role, ...others } = result;
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
  sendResponse<IAuthUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${role} Login successfully`,
    data: others,
  });
});
const loginUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.loginUser(req.body);
  const { refreshToken, role, ...others } = result;
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
  sendResponse<IAuthUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: `${role} Login successfully`,
    data: others,
  });
});
const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;
  const result = await AuthService.refreshToken(refreshToken);
  const cookieOptions = {
    secure: config.env === "production",
    httpOnly: true,
  };
  res.cookie("refreshToken", refreshToken, cookieOptions);
  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "New access token generated successfully ",
    data: result,
  });
});

export const AuthController = {
  loginAdmin,
  loginUser,
  refreshToken,
};
