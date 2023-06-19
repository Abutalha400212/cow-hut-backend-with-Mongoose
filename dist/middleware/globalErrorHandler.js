"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const handleValidationError_1 = __importDefault(require("../errors/handleValidationError"));
const config_1 = __importDefault(require("../config"));
const globalErrorHandler = (error, req, res, next) => {
    let statusCode = 400;
    let message = "Something went wrong";
    let errorMessage = [];
    if (error.name === "ValidationError") {
        const simplifiedError = (0, handleValidationError_1.default)(error);
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message;
        errorMessage = simplifiedError.errorMessages;
    }
    res.status(statusCode).json({
        statusCode,
        message,
        errorMessage,
        stack: config_1.default.env !== "production" ? error.stack : undefined,
    });
    next();
};
exports.default = globalErrorHandler;
