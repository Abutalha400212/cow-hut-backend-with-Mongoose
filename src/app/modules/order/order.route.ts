import express from "express";
import { OrderController } from "./order.controller";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
import validateRequest from "../../../middleware/validateRequest";
import { OrderValidation } from "./order.validation";
const router = express.Router();
router.post(
  "/create-order",
  validateRequest(OrderValidation.createOrderZodSchema),
  auth(ENUM_USER_ROLE.BUYER),
  OrderController.createOrder
);
router.get(
  "/",
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  OrderController.getOrders
);
export const OrderRoutes = router;
