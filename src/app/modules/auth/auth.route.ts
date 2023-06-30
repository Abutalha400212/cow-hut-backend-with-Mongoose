import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
const router = express.Router();
router.post(
  "/admin/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginAdmin
);
router.post(
  "/user/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);
router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
