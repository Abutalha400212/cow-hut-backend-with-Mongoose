import express from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../../middleware/validateRequest";
import { AdminValidation } from "./admin.validation";

const router = express.Router();

router.post(
  "/create-admin",
  validateRequest(AdminValidation.createAdminZodSchema),
  AdminController.createAdmin
);

router.get("/", AdminController.getAllAdmin);
router
  .route("/:id")
  .get(AdminController.getSingleAdmin)
  .delete(AdminController.deleteSingleAdmin)
  .patch(
    validateRequest(AdminValidation.updateAdminZodSchema),
    AdminController.updateSingleAdmin
  );

export const AdminRoutes = router;
