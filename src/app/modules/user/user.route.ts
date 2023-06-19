import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/auth/sign-up", UserController.createUser);
router.get("/users", UserController.getAllUsers);
router
  .route("/users/:id")
  .get(UserController.getSingleUser)
  .delete(UserController.deleteSingleUser)
  .patch(UserController.updateSingleUser);

export const UserRoute = router;
