"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const admin_constant_1 = require("./admin.constant");
const createAdminZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string().optional(),
        role: zod_1.default.enum([...admin_constant_1.adminRole], {
            required_error: "Role is required",
        }),
        PhoneNumber: zod_1.default.string({
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
    }),
});
const updateAdminZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string().optional(),
        role: zod_1.default.enum([...admin_constant_1.adminRole]).optional(),
        PhoneNumber: zod_1.default.string().optional(),
        name: zod_1.default
            .object({
            firstName: zod_1.default.string().optional(),
            lastName: zod_1.default.string().optional(),
        })
            .optional(),
        address: zod_1.default.string().optional(),
    }),
});
const loginAdminZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        password: zod_1.default.string({
            required_error: "Password is required",
        }),
        phoneNumber: zod_1.default.string({
            required_error: "PhoneNumber is required",
        }),
    }),
});
exports.AdminValidation = {
    createAdminZodSchema,
    updateAdminZodSchema,
    loginAdminZodSchema,
};
