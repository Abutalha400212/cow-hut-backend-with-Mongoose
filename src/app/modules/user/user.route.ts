import express from "express";
import { UserController } from "./user.controller";
import { ENUM_USER_ROLE } from "../../enums/user";
import auth from "../../../middleware/auth";

const router = express.Router();

router.post(
  "/create-user",
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.createUser
);
router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router
  .route("/:id")
  .get(auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser)
  .delete(auth(ENUM_USER_ROLE.ADMIN), UserController.deleteSingleUser)
  .patch(auth(ENUM_USER_ROLE.ADMIN), UserController.updateSingleUser);

export const UserRoutes = router;
