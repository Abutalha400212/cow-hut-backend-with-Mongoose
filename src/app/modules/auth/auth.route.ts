import express from "express";
import { AuthController } from "./auth.controller";
import validateRequest from "../../../middleware/validateRequest";
import { AuthValidation } from "./auth.validation";
import { UserValidation } from "../user/user.validation";
const router = express.Router();
router.post(
  "/signup",
  validateRequest(UserValidation.createUserZodSchema),
  AuthController.createUser
);
router.post(
  "/login",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
