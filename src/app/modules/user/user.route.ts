import express from "express";
import { UserController } from "./user.controller";

const router = express.Router();

router.post("/create-user", UserController.createUser);
router.get("/", UserController.getAllUsers);
router
  .route("/:id")
  .get(UserController.getSingleUser)
  .delete(UserController.deleteSingleUser)
  .patch(UserController.updateSingleUser);

export const UserRoute = router;
