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
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const config_1 = __importDefault(require("../../../config"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const http_status_1 = __importDefault(require("http-status"));
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
        unique: true,
    },
    address: String,
    budget: Number,
    income: Number,
}, {
    timestamps: true,
});
userSchema.statics.isUserExist = function (phoneNumber) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield exports.User.findOne({ phoneNumber }, { phoneNumber: 1, password: 1, role: 1 });
    });
};
userSchema.statics.isPasswordMatched = function (givenPassword, savedPassword) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield bcrypt_1.default.compare(givenPassword, savedPassword);
    });
};
userSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.role === "seller" && (user.budget > 0 || user.income > 0)) {
            throw new apiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Can't be able to add budget/income as a seller");
        }
        if (user.role === "buyer" && (user.income <= 0 || user.income > 0)) {
            throw new apiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Can't be able to add income as a buyer.");
        }
        if (user.role === "buyer" && user.budget <= 0) {
            throw new apiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Would keep a minimum value of budget as a buyer");
        }
        user.password = yield bcrypt_1.default.hash(user.password, Number(config_1.default.bcrypt_salt_rounds));
        next();
    });
});
exports.User = (0, mongoose_1.model)("User", userSchema);
