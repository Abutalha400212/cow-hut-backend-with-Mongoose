"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const cow_model_1 = require("./cow.model");
const filteringHelpers_1 = require("../../../helpers/filteringHelpers");
const addCow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const addedCow = yield cow_model_1.Cow.create(payload);
    if (!addedCow) {
        throw new Error("Cow is not added");
    }
    return addedCow;
});
const getAllCow = (filters, paginationOtions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = paginationHelpers_1.PaginationHelper.createPagination(paginationOtions);
    const skip = (page - 1) * limit;
    const sortCondition = {};
    const andConditions = filteringHelpers_1.FilteringHelper.filteringHelpers(filters);
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    let result = [];
    if (!Object.keys(filters).length) {
        result = yield cow_model_1.Cow.find().sort(sortCondition).skip(skip).limit(limit);
    }
    else {
        result = yield cow_model_1.Cow.find({ $and: andConditions })
            .sort(sortCondition)
            .skip(skip)
            .limit(limit);
    }
    const total = yield cow_model_1.Cow.estimatedDocumentCount();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findOne({ _id: id }).populate("seller");
    return result;
});
const deleteSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.deleteOne({ _id: id });
    return result;
});
const updateSingleCow = (id, update) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.updateOne({ _id: id }, update);
    return result;
});
exports.CowService = {
    addCow,
    getAllCow,
    getSingleCow,
    deleteSingleCow,
    updateSingleCow,
};
