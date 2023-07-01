"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const cow_constant_1 = require("./cow.constant");
const createCowZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        label: zod_1.default.enum(["for-sale", "sold-out"], {
            required_error: "label is required",
        }),
        category: zod_1.default.enum(["dairy", "beef", "dualPurpose"], {
            required_error: "category is required",
        }),
        location: zod_1.default.enum([...cow_constant_1.divisions], {
            required_error: "label is required",
        }),
        breed: zod_1.default.enum([...cow_constant_1.breeds], {
            required_error: "label is required",
        }),
        age: zod_1.default.number({
            required_error: "Age is required",
        }),
        weight: zod_1.default.number({
            required_error: "Weight is required",
        }),
        name: zod_1.default.string({
            required_error: "Name is required",
        }),
        price: zod_1.default.number({
            required_error: "Price is required",
        }),
    }),
});
const updateCowZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        label: zod_1.default.enum(["for-sale", "sold-out"]).optional(),
        category: zod_1.default.enum(["dairy", "beef", "dualPurpose"]).optional(),
        location: zod_1.default.enum([...cow_constant_1.divisions]).optional(),
        breed: zod_1.default.enum([...cow_constant_1.breeds]).optional(),
        age: zod_1.default.number().optional(),
        weight: zod_1.default.number().optional(),
        name: zod_1.default.string().optional(),
        price: zod_1.default.number().optional(),
    }),
});
exports.CowValidation = {
    createCowZodSchema,
    updateCowZodSchema,
};
