import express from "express";
import { CowController } from "./cow.controller";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
const router = express.Router();

router
  .route("/")
  .post(auth(ENUM_USER_ROLE.SELLER), CowController.addCow)
  .get(
    auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
    CowController.getAllCow
  );
router
  .route("/:id")
  .get(
    auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
    CowController.getSingleCow
  )
  .delete(auth(ENUM_USER_ROLE.SELLER), CowController.deleteSingleCow)
  .patch(auth(ENUM_USER_ROLE.SELLER), CowController.updateSingleCow);

export const CowRoutes = router;
