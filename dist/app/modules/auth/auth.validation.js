"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const loginZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        phoneNumber: zod_1.default.string({
            required_error: "phoneNumber is required",
        }),
        password: zod_1.default.string({
            required_error: "Password is required",
        }),
    }),
});
exports.AuthValidation = {
    loginZodSchema,
};
