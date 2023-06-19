import express from "express";
import { CowController } from "./cow.controller";
const router = express.Router();

router.post("/", CowController.addCow).get("/", CowController.getAllCow);
router
  .route("/:id")
  .get(CowController.getSingleCow)
  .delete(CowController.deleteSingleCow)
  .patch(CowController.updateSingleCow);

export const CowRoute = router;
