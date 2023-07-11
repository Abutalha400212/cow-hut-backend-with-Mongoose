"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("./admin.controller");
const validateRequest_1 = __importDefault(require("../../../middleware/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const router = express_1.default.Router();
router.post("/create-admin", (0, validateRequest_1.default)(admin_validation_1.AdminValidation.createAdminZodSchema), admin_controller_1.AdminController.createAdmin);
router.post("/login", (0, validateRequest_1.default)(admin_validation_1.AdminValidation.loginAdminZodSchema), admin_controller_1.AdminController.loginAdmin);
router.get("/", admin_controller_1.AdminController.getAllAdmin);
router
    .route("/:id")
    .get(admin_controller_1.AdminController.getSingleAdmin)
    .delete(admin_controller_1.AdminController.deleteSingleAdmin)
    .patch((0, validateRequest_1.default)(admin_validation_1.AdminValidation.updateAdminZodSchema), admin_controller_1.AdminController.updateSingleAdmin);
exports.AdminRoutes = router;
