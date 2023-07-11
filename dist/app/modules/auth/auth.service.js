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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const apiError_1 = __importDefault(require("../../../errors/apiError"));
const config_1 = __importDefault(require("../../../config"));
const JWT_token_1 = require("../../../helpers/JWT.token");
const admin_model_1 = require("../admin/admin.model");
const user_model_1 = require("../user/user.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const createdUser = yield user_model_1.User.create(payload);
    return createdUser;
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber: contactId, password } = payload;
    const isUserExist = yield user_model_1.User.isUserExist(contactId);
    if (!isUserExist) {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User does not Found");
    }
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(password, isUserExist.password);
    if (!isPasswordMatched) {
        throw new apiError_1.default(http_status_1.default.UNAUTHORIZED, "password is inCorrect");
    }
    const { phoneNumber, role, _id } = isUserExist;
    const accessToken = JWT_token_1.jwtHelpers.createToken({ phoneNumber, role, _id }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = JWT_token_1.jwtHelpers.createToken({ phoneNumber, role, _id }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        role,
        refreshToken,
    };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken = null;
    let newAccessToken = null;
    try {
        verifiedToken = JWT_token_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new apiError_1.default(http_status_1.default.FORBIDDEN, "Invalid Refresh Token");
    }
    const { phoneNumber } = verifiedToken;
    const isUserExist = yield user_model_1.User.isUserExist(phoneNumber);
    const isAdminExist = yield admin_model_1.Admin.isAdminExist(phoneNumber);
    if ((isUserExist || isAdminExist) && !null && !undefined) {
        newAccessToken = JWT_token_1.jwtHelpers.createToken({
            phoneNumber: isUserExist
                ? isUserExist.phoneNumber
                : isAdminExist.phoneNumber,
            role: isUserExist ? isUserExist.role : isAdminExist.role,
        }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    }
    else {
        throw new apiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist");
    }
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    loginUser,
    refreshToken,
    createUser,
};
