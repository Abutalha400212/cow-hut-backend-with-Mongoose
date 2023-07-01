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
exports.OrderService = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const cow_model_1 = require("../cow/cow.model");
const user_model_1 = require("../user/user.model");
const order_model_1 = require("./order.model");
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { cow: cowId, buyer: buyerId } = payload;
    const isBuyer = yield user_model_1.User.findById({ _id: buyerId, role: "buyer" });
    if (!isBuyer) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Only Buyer can buy a cow");
    }
    const isCowExist = yield cow_model_1.Cow.findById({ _id: cowId });
    if (!isCowExist) {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Cow does not Found");
    }
    let result = null;
    const session = yield mongoose_1.default.startSession();
    try {
        session.startTransaction();
        if (isBuyer.budget < isCowExist.price) {
            throw new apiError_1.default(http_status_1.default.BAD_GATEWAY, "Insufficient Balance");
        }
        yield user_model_1.User.findOneAndUpdate({ _id: buyerId }, { $inc: { budget: -Number(isCowExist === null || isCowExist === void 0 ? void 0 : isCowExist.price) } }, { new: true, session: session });
        yield user_model_1.User.findOneAndUpdate({ _id: isCowExist.seller }, { $inc: { income: Number(isCowExist === null || isCowExist === void 0 ? void 0 : isCowExist.price) } }, { new: true, session: session });
        if (isCowExist.label === "sold-out") {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "This Cow already has sold");
        }
        yield cow_model_1.Cow.findOneAndUpdate({ _id: cowId }, { $set: { label: "sold-out" } }, { new: true, session: session });
        payload.seller = isCowExist.seller;
        const createOrder = yield order_model_1.Order.create([payload], { session: session });
        if (!createOrder.length) {
            throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Failed to create a user");
        }
        result = createOrder[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    if (result) {
        result = yield order_model_1.Order.findById({ _id: result._id })
            .populate("cow")
            .populate("seller")
            .populate("buyer");
    }
    return result;
});
const getOrders = (user, paginationOtions) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id } = user;
    const { page, limit, sortBy, sortOrder } = paginationHelpers_1.PaginationHelper.createPagination(paginationOtions);
    const skip = (page - 1) * limit;
    const sortCondition = {};
    if (sortBy && sortOrder) {
        sortCondition[sortBy] = sortOrder;
    }
    let condition = {};
    if (user.role === "admin") {
        condition = {};
    }
    else if (user.role === "buyer") {
        condition = { buyer: _id };
    }
    else if (user.role === "seller") {
        condition = { seller: _id };
    }
    const result = yield order_model_1.Order.find(condition)
        .sort(sortCondition)
        .skip(skip)
        .limit(limit);
    const total = yield order_model_1.Order.estimatedDocumentCount();
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleOrder = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const { _id: userId, role } = user;
    console.log({ userId, role });
    let condition = {};
    if (user.role === "admin") {
        condition = { _id: id };
    }
    else if (user.role === "buyer") {
        condition = { _id: id, buyer: userId };
    }
    else if (user.role === "seller") {
        condition = { _id: id, seller: userId };
    }
    const result = yield order_model_1.Order.findOne(condition)
        .populate("cow")
        .populate("buyer")
        .populate("seller");
    return result;
});
exports.OrderService = {
    createOrder,
    getOrders,
    getSingleOrder,
};
