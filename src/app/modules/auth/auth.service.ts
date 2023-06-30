import httpStatus from "http-status";
import ApiError from "../../../errors/apiError";
import {
  IAuth,
  IAuthUserResponse,
  IRefreshTokenResponse,
} from "./auth.interface";
import config from "../../../config";
import { Secret } from "jsonwebtoken";
import { jwtHelpers } from "../../../helpers/JWT.token";
import { Admin } from "../admin/admin.model";
import { User } from "../user/user.model";
const loginAdmin = async (payload: IAuth): Promise<IAuthUserResponse> => {
  const { phoneNumber: contactId, password } = payload;
  const isAdminExist = await Admin.isAdminExist(contactId);
  if (!isAdminExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "Admin does not Found");
  }
  const isPasswordMatched = await Admin.isPasswordMatched(
    password,
    isAdminExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password is inCorrect");
  }

  const { phoneNumber, role, _id } = isAdminExist;
  const accessToken = jwtHelpers.createToken(
    { phoneNumber, role, _id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { phoneNumber, role, _id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    role,
    refreshToken,
  };
};
const loginUser = async (payload: IAuth): Promise<IAuthUserResponse> => {
  const { phoneNumber: contactId, password } = payload;
  const isUserExist = await User.isUserExist(contactId);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not Found");
  }
  const isPasswordMatched = await User.isPasswordMatched(
    password,
    isUserExist.password
  );
  if (!isPasswordMatched) {
    throw new ApiError(httpStatus.UNAUTHORIZED, "password is inCorrect");
  }

  const { phoneNumber, role, _id } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { phoneNumber, role, _id },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { phoneNumber, role, _id },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    role,
    refreshToken,
  };
};

const refreshToken = async (token: string): Promise<IRefreshTokenResponse> => {
  let verifiedToken = null;
  let newAccessToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, "Invalid Refresh Token");
  }

  const { phoneNumber } = verifiedToken;
  const isUserExist = await User.isUserExist(phoneNumber);
  const isAdminExist = await Admin.isAdminExist(phoneNumber);
  if ((isUserExist || isAdminExist) && !null && !undefined) {
    newAccessToken = jwtHelpers.createToken(
      {
        phoneNumber: isUserExist
          ? isUserExist.phoneNumber
          : isAdminExist.phoneNumber,
        role: isUserExist ? isUserExist.role : isAdminExist.role,
      },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );
  } else {
    throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
  }

  return {
    accessToken: newAccessToken,
  };
};
export const AuthService = {
  loginAdmin,
  loginUser,
  refreshToken,
};
