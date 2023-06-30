import express from "express";
import { AuthController } from "./auth.controller";
const router = express.Router();
router.post("/admin/login", AuthController.loginAdmin);
router.post("/user/login", AuthController.loginUser);
router.post("/refresh-token", AuthController.refreshToken);

export const AuthRoutes = router;
