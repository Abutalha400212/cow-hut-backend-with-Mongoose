"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cow = void 0;
const mongoose_1 = require("mongoose");
const cow_constant_1 = require("./cow.constant");
const cowSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    location: {
        type: String,
        required: true,
        enum: cow_constant_1.divisions,
    },
    breed: {
        type: String,
        required: true,
        enum: cow_constant_1.breeds,
    },
    weight: {
        type: Number,
        required: true,
    },
    label: {
        type: String,
        required: true,
        enum: ["for-sale", "sold-out"],
    },
    category: {
        type: String,
        required: true,
        enum: ["dairy", "beef", "dualPurpose"],
    },
    seller: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
});
exports.Cow = (0, mongoose_1.model)("Cow", cowSchema);
