import { Schema } from "mongoose";
import { IBangladeshDivision, IBreed } from "./cow.constant";
type ObjectId = Schema.Types.ObjectId;
export type ICow = {
  name: string;
  age: number;
  price: number;
  location: IBangladeshDivision;
  breed: IBreed;
  weight: number;
  label: "for-sale" | "sold-out";
  category: "dairy" | "beef" | "dualPurpose ";
  seller: ObjectId;
};

export type IPaginationOptions = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
};
export type ICowFilter = {
  searchTerm?: string;
};

export type IGenereicResponse<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
