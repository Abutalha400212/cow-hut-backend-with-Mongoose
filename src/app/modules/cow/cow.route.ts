import express from "express";
import { CowController } from "./cow.controller";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import validateRequest from "../../../middleware/validateRequest";
import { CowValidation } from "./cow.validation";
const router = express.Router();
router.post(
  "/create-cow",
  validateRequest(CowValidation.createCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.addCow
);
router.get(
  "/",
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
  .patch(
    validateRequest(CowValidation.updateCowZodSchema),
    auth(ENUM_USER_ROLE.SELLER),
    CowController.updateSingleCow
  );

export const CowRoutes = router;
