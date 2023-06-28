import express from "express";
import { OrderController } from "./order.controller";
const router = express.Router();

router.route("/").post(OrderController.createOrder);

export const OrderRoute = router;
