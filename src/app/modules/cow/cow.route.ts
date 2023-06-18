import express from "express";
import { CowController } from "./cow.controller";
const router = express.Router();

router.post("/cows", CowController.addCow);
router.get("/cows", CowController.getAllCow);

export const CowRoute = router;
