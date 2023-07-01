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
exports.OrderController = void 0;
const order_service_1 = require("./order.service");
const http_status_1 = __importDefault(require("http-status"));
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const cow_constant_1 = require("../cow/cow.constant");
const pick_1 = __importDefault(require("../../../shared/pick"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const orderData = __rest(req.body, []);
    const result = yield order_service_1.OrderService.createOrder(orderData);
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order Created successfully",
        data: result,
    });
}));
const getOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const paginationOtions = (0, pick_1.default)(req.query, cow_constant_1.paginationFields);
    const user = __rest(req === null || req === void 0 ? void 0 : req.user, []);
    const result = yield order_service_1.OrderService.getOrders(user, paginationOtions);
    // Check specific User for existed Order
    if (!result.data.length && user.role !== "admin") {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Your are not a seller/buyer for this order");
    }
    if (!result.data.length && user.role === "admin") {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Data is not found");
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order retrived successfully",
        meta: result.meta,
        data: result.data,
    });
}));
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = __rest(req === null || req === void 0 ? void 0 : req.user, []);
    const result = yield order_service_1.OrderService.getSingleOrder(id, user);
    // Check specific User for existed Order
    if (!result && user.role !== "admin") {
        throw new apiError_1.default(http_status_1.default.BAD_REQUEST, "Your are not a seller/buyer for this order");
    }
    if (!result && user.role === "admin") {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Data is not found");
    }
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: "Order retrived successfully",
        data: result,
    });
}));
exports.OrderController = {
    createOrder,
    getOrders,
    getSingleOrder,
};
