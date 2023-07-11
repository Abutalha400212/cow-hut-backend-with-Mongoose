"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const user_1 = require("../../enums/user");
const auth_1 = __importDefault(require("../../../middleware/auth"));
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const user_validation_1 = require("./user.validation");
const router = express_1.default.Router();
router.get("/my-profile", user_controller_1.UserController.getProfile);
router.patch("/update-profile", (0, validateRequest_1.default)(user_validation_1.UserValidation.updateMyProfileSchema), user_controller_1.UserController.updateProfile);
router.get("/", (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getAllUsers);
router
    .route("/:id")
    .get((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.getSingleUser)
    .delete((0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.deleteSingleUser)
    .patch((0, validateRequest_1.default)(user_validation_1.UserValidation.updateUserZodSchema), (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN), user_controller_1.UserController.updateSingleUser);
exports.UserRoutes = router;
