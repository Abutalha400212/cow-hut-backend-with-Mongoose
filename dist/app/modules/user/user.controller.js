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
exports.UserController = void 0;
const user_service_1 = require("./user.service");
const http_status_1 = __importDefault(require("http-status"));
const createUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.createUser(req.body);
        res.status(http_status_1.default.OK).json({
            success: true,
            message: "User Created successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
const getAllUsers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.getAllUsers();
        if (result.length) {
            res.status(http_status_1.default.OK).json({
                success: true,
                message: "User retrived successfully",
                data: result,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const getSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.getSingleUser(req.params.id);
        if (result) {
            res.status(http_status_1.default.OK).json({
                success: true,
                message: "User retrived successfully",
                data: result,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const deleteSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.deleteSingleUser(req.params.id);
        if (result.deletedCount > 0) {
            res.status(http_status_1.default.OK).json({
                success: true,
                message: "User deleted successfully",
                data: result,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
const updateSingleUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserService.updateSingleUser(req.params.id, req.body);
        if (result.modifiedCount > 0) {
            res.status(http_status_1.default.OK).json({
                success: true,
                message: "User updated successfully",
                data: req.body,
            });
        }
    }
    catch (error) {
        next(error);
    }
});
exports.UserController = {
    createUser,
    getAllUsers,
    getSingleUser,
    deleteSingleUser,
    updateSingleUser,
};
