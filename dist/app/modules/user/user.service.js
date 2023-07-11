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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const filteringHelpers_1 = require("../../../helpers/filteringHelpers");
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const user_model_1 = require("./user.model");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const JWT_token_1 = require("../../../helpers/JWT.token");
const config_1 = __importDefault(require("../../../config"));
const getAllUsers = (filters, paginationOtions) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, limit, sortBy, sortOrder } = paginationHelpers_1.PaginationHelper.createPagination(paginationOtions);
    const skip = (page - 1) * limit;
    const sortCondition = {};
    const andConditions = filteringHelpers_1.FilteringHelper.UserFilteringHelpers(filters);
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    const whereConditions = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield user_model_1.User.find(whereConditions)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield user_model_1.User.estimatedDocumentCount();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const result = yield user_model_1.User.findById({ _id: id });
    return result;
});
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const result = yield user_model_1.User.findOneAndDelete({ _id: id });
    return result;
});
const updateSingleUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield user_model_1.User.findOne({ _id: id });
    if (!isExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User not found !");
    }
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updatedUserData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedUserData[nameKey] = name[key];
        });
    }
    const result = yield user_model_1.User.findOneAndUpdate({ _id: id }, updatedUserData, {
        new: true,
    });
    return result;
});
const getProfile = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, role } = JWT_token_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (role && role === "admin") {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "You can't see admin profile");
    }
    const result = yield user_model_1.User.findById({ _id }, { name: 1, phoneNumber: 1, address: 1, _id: 0 });
    return result;
});
const updateProfile = (payload, token) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id, role } = JWT_token_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const { name } = payload, userData = __rest(payload, ["name"]);
    const updatedData = Object.assign({}, userData);
    if (name && Object.keys(name).length > 0) {
        Object.keys(name).forEach((key) => {
            const nameKey = `name.${key}`;
            updatedData[nameKey] = name[key];
        });
        if (role && role === "admin") {
            throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "You can't update an admin profile");
        }
        const result = yield user_model_1.User.findOneAndUpdate({ _id }, updatedData, {
            projection: {
                name: true,
                phoneNumber: true,
                address: true,
                _id: false,
            },
            new: true,
        });
        return result;
    }
});
exports.UserService = {
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    updateSingleUser,
    getProfile,
    updateProfile,
};
