import { Model } from "mongoose";

export type IAuth = {
  phoneNumber: string;
  password: string;
};
export type AuthModel = Model<IAuth, Record<string, unknown>>;

export type IAuthUserResponse = {
  accessToken: string;
  role?: string;
  refreshToken?: string;
};

export type IRefreshTokenResponse = {
  accessToken: string;
};
