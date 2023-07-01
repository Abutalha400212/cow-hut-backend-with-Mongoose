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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const cow_model_1 = require("./cow.model");
const filteringHelpers_1 = require("../../../helpers/filteringHelpers");
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const user_model_1 = require("../user/user.model");
const addCow = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isSeller = yield user_model_1.User.findOne({ _id: payload === null || payload === void 0 ? void 0 : payload.seller, role: "seller" });
    if (!isSeller) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, `Only seller can add a cow`);
    }
    const addedCow = yield cow_model_1.Cow.create(payload);
    return addedCow;
});
const getAllCow = (filters, paginationOtions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = paginationHelpers_1.PaginationHelper.createPagination(paginationOtions);
    const skip = (page - 1) * limit;
    const sortCondition = {};
    const andConditions = filteringHelpers_1.FilteringHelper.CowFilteringHelpers(filters);
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cow_model_1.Cow.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.Cow.estimatedDocumentCount(whereConditions);
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
    const isExist = yield cow_model_1.Cow.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const result = yield cow_model_1.Cow.findById({ _id: id }).populate("seller");
    return result;
});
const deleteSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield cow_model_1.Cow.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const result = yield cow_model_1.Cow.findOneAndDelete({ _id: id });
    return result;
});
const updateSingleCow = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield cow_model_1.Cow.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const updatedCowData = Object.assign({}, payload);
    const result = yield cow_model_1.Cow.findOneAndUpdate({ _id: id }, updatedCowData, {
        new: true,
    });
    return result;
});
exports.CowService = {
    addCow,
    getAllCow,
    getSingleCow,
    deleteSingleCow,
    updateSingleCow,
};
