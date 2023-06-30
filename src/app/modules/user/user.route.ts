import express from "express";
import { UserController } from "./user.controller";
import { ENUM_USER_ROLE } from "../../enums/user";
import auth from "../../../middleware/auth";
import validateRequest from "../../../middleware/validateRequest";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.post(
  "/create-user",
  validateRequest(UserValidation.createUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.createUser
);
router.get("/my-profile", UserController.getProfile);
router.patch("/update-profile", UserController.updateProfile);
router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);
router
  .route("/:id")
  .get(auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser)
  .delete(auth(ENUM_USER_ROLE.ADMIN), UserController.deleteSingleUser)
  .patch(
    validateRequest(UserValidation.updateUserZodSchema),
    auth(ENUM_USER_ROLE.ADMIN),
    UserController.updateSingleUser
  );

export const UserRoutes = router;
