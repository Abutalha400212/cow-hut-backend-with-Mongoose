import { Model, ObjectId } from "mongoose";

export type IUser = {
  _id: ObjectId;
  password: string;
  role: "buyer" | "seller";
  name: {
    firstName: string;
    lastName: string;
  };
  phoneNumber: string;
  address: string;
  budget: number;
  income: number;
};
export type UserModel = {
  isUserExist(
    id: string
  ): Promise<Pick<IUser, "_id" | "phoneNumber" | "password" | "role">>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
} & Model<IUser>;
export type IUserFilter = {
  searchTerm?: string;
  phoneNumber?: string;
  address?: string;
};
