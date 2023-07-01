"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createOrderZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        buyer: zod_1.default.string({
            required_error: "Buyer is required",
        }),
        cow: zod_1.default.string({
            required_error: "Cow is required",
        }),
    }),
});
const updateOrderZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        buyer: zod_1.default.string().optional(),
        cow: zod_1.default.string().optional(),
    }),
});
exports.OrderValidation = {
    createOrderZodSchema,
    updateOrderZodSchema,
};
