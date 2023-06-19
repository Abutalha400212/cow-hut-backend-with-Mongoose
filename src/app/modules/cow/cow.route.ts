import express from "express";
import { CowController } from "./cow.controller";
const router = express.Router();

router.post("/", CowController.addCow).get("/", CowController.getAllCow);
router
  .get("/:id", CowController.getSingleCow)
  .delete("/:id", CowController.deleteSingleCow)
  .patch("/:id", CowController.updateSingleCow);

export const CowRoute = router;
