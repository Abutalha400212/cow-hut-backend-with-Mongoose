"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["buyer", "seller"],
    },
    name: {
        firstName: String,
        lastName: String,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    address: String,
    budget: Number,
    income: Number,
}, {
    timestamps: true,
});
exports.User = (0, mongoose_1.model)("User", userSchema);
// userSchema.post("save", function (error, doc, next) {
//   if (error.name === "MongoError" && error.code === 11000) {
//     next(new Error("There was a duplicate key error"));
//   } else {
//     next();
//   }
// });
