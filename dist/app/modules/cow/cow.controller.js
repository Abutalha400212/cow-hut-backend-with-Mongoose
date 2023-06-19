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
exports.CowController = void 0;
const cow_service_1 = require("./cow.service");
const http_status_1 = __importDefault(require("http-status"));
const cow_constant_1 = require("./cow.constant");
const pick_1 = __importDefault(require("../../../shared/pick"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const addCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield cow_service_1.CowService.addCow(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Cow is added successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filters = (0, pick_1.default)(req.query, cow_constant_1.filterFields);
        const paginationOtions = (0, pick_1.default)(req.query, cow_constant_1.paginationFields);
        const result = yield cow_service_1.CowService.getAllCow(filters, paginationOtions);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "Cows data retrived successfully",
            meta: result.meta,
            data: result.data,
        });
    }
    catch (error) {
        next(error);
    }
});
const getSingleCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Provied Id is not valid");
        }
        const result = yield cow_service_1.CowService.getSingleCow(id);
        if (result) {
            res.status(http_status_1.default.OK).json({
                success: true,
                message: "Cows data retrived successfully",
                data: result,
            });
        }
        else {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Data Not found");
        }
    }
    catch (error) {
        next(error);
    }
});
const deleteSingleCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Provied Id is not valid");
        }
        const result = yield cow_service_1.CowService.deleteSingleCow(id);
        if (result.deletedCount > 0) {
            res.status(http_status_1.default.OK).json({
                success: true,
                message: "Cow is deleted successfully",
                data: result,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const updateSingleCow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        if (typeof id !== "string") {
            throw new apiError_1.default(http_status_1.default.NOT_FOUND, "Provied Id is not valid");
        }
        const result = yield cow_service_1.CowService.updateSingleCow(id, req.body);
        if (result.modifiedCount > 0) {
            res.status(http_status_1.default.OK).json({
                success: true,
                message: "Cow has updeted successfully",
                data: req.body,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.CowController = {
    addCow,
    getAllCow,
    getSingleCow,
    deleteSingleCow,
    updateSingleCow,
};
