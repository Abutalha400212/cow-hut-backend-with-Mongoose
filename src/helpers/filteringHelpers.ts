import { academicSemesterSearchableFields } from "../app/modules/cow/cow.constant";
import { ICowFilter } from "../app/modules/cow/cow.interface";

const filteringHelpers = (options: ICowFilter) => {
  const { searchTerm, minPrice, maxPrice, ...filtersData } = options;
  const andConditions: any = [];
  if (searchTerm) {
    andConditions.push({
      $or: academicSemesterSearchableFields.map((field) => ({
        [field]: {
          $regex: searchTerm,
          $options: "i",
        },
      })),
    });
  }
  if (Object.keys(filtersData).length) {
    andConditions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }
  if (minPrice || maxPrice) {
    maxPrice &&
      andConditions.push({
        price: { $lte: maxPrice },
      });
    minPrice &&
      andConditions.push({
        price: { $gte: minPrice },
      });
  }
  return andConditions;
};

export const FilteringHelper = { filteringHelpers };
