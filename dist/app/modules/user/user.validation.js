"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const user_constant_1 = require("./user.constant");
const createUserZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string({
            required_error: "Password is required",
        }),
        role: zod_1.default.enum([...user_constant_1.userRole], {
            required_error: "Role is required",
        }),
        phoneNumber: zod_1.default.string({
            required_error: "PhoneNumber is required",
        }),
        name: zod_1.default.object({
            firstName: zod_1.default.string({
                required_error: "FirstName is required",
            }),
            lastName: zod_1.default.string({
                required_error: "LastName is required",
            }),
        }),
        address: zod_1.default.string({
            required_error: "Address is required",
        }),
        income: zod_1.default.number({
            required_error: "Income is required",
        }),
        budget: zod_1.default.number({
            required_error: "Budget is required",
        }),
    }),
});
const updateUserZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string().optional(),
        role: zod_1.default.enum([...user_constant_1.userRole]).optional(),
        phoneNumber: zod_1.default.string().optional(),
        name: zod_1.default
            .object({
            firstName: zod_1.default.string().optional(),
            lastName: zod_1.default.string().optional(),
        })
            .optional(),
        address: zod_1.default.string().optional(),
        income: zod_1.default.number().optional(),
        budget: zod_1.default.number().optional(),
    }),
});
const updateMyProfileSchema = zod_1.default.object({
    body: zod_1.default.object({
        phoneNumber: zod_1.default.string().optional(),
        name: zod_1.default
            .object({
            firstName: zod_1.default.string().optional(),
            lastName: zod_1.default.string().optional(),
        })
            .optional(),
        address: zod_1.default.string().optional(),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
    updateUserZodSchema,
    updateMyProfileSchema,
};
