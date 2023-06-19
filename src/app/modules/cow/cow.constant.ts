export type IBangladeshDivision =
  | "Barisal"
  | "Chattogram"
  | "Dhaka"
  | "Khulna"
  | "Mymensingh"
  | "Rajshahi"
  | "Rangpur"
  | "Sylhet";

export const divisions: IBangladeshDivision[] = [
  "Barisal",
  "Chattogram",
  "Dhaka",
  "Khulna",
  "Mymensingh",
  "Rajshahi",
  "Rangpur",
  "Sylhet",
];

export type IBreed =
  | "Brahman"
  | "Nellore"
  | "Sahiwal"
  | "Gir"
  | "Indigenous"
  | "Tharparkar"
  | "Kankrej";

export const breeds: IBreed[] = [
  "Brahman",
  "Nellore",
  "Sahiwal",
  "Gir",
  "Indigenous",
  "Tharparkar",
  "Kankrej",
];

export const paginationFields = ["page", "limit", "sortBy", "sortOrder"];
export const filterFields = [
  "searchTerm",
  "location",
  "breed",
  "category",
  "name",
  "price",
  "minPrice",
  "maxPrice",
];
export const academicSemesterSearchableFields = [
  "location",
  "breed",
  "category",
];
