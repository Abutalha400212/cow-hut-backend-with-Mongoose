import { Types } from "mongoose";
import { IBangladeshDivision, IBreed } from "./cow.constant";
import { IUser } from "../user/user.interface";
export type ICow = {
  name: string;
  age: number;
  price: number;
  location: IBangladeshDivision;
  breed: IBreed;
  weight: number;
  label: "for-sale" | "sold-out";
  category: "dairy" | "beef" | "dualPurpose ";
  seller: Types.ObjectId | IUser;
};
export type ICowFilter = {
  searchTerm?: string;
  maxPrice?: number;
  minPrice?: number;
};
