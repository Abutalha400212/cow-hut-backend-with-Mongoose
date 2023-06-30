import express from "express";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.post("/create-admin", AdminController.createAdmin);

router.get("/", AdminController.getAllAdmin);
router
  .route("/:id")
  .get(AdminController.getSingleAdmin)
  .delete(AdminController.deleteSingleAdmin)
  .patch(AdminController.updateSingleAdmin);

export const AdminRoutes = router;
