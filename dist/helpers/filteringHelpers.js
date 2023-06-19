"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilteringHelper = void 0;
const cow_constant_1 = require("../app/modules/cow/cow.constant");
const filteringHelpers = (options) => {
    const { searchTerm, minPrice, maxPrice } = options, filtersData = __rest(options, ["searchTerm", "minPrice", "maxPrice"]);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.academicSemesterSearchableFields.map((field) => ({
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
exports.FilteringHelper = { filteringHelpers };
