"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowRoute = void 0;
const express_1 = __importDefault(require("express"));
const cow_controller_1 = require("./cow.controller");
const router = express_1.default.Router();
router.post("/", cow_controller_1.CowController.addCow).get("/", cow_controller_1.CowController.getAllCow);
router
    .route("/:id")
    .get(cow_controller_1.CowController.getSingleCow)
    .delete(cow_controller_1.CowController.deleteSingleCow)
    .patch(cow_controller_1.CowController.updateSingleCow);
exports.CowRoute = router;
