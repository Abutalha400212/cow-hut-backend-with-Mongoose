import { Model, ObjectId } from "mongoose";

export type IAdmin = {
  _id: ObjectId;
  password: string;
  role: "admin";
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
};
export type AdminModel = {
  isAdminExist(
    id: string
  ): Promise<Pick<IAdmin, "_id" | "phoneNumber" | "password" | "role">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IAdmin>;
export type IAdminFilter = {
  searchTerm?: string;
  phoneNumber?: string;
  address?: string;
};

export type IAuthAdmin = {
  phoneNumber: string;
  password: string;
};
export type IAuthAdminResponse = {
  accessToken: string;
  role?: string;
  refreshToken?: string;
};
