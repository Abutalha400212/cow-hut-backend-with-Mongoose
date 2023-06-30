import express from "express";
import { OrderController } from "./order.controller";
import auth from "../../../middleware/auth";
import { ENUM_USER_ROLE } from "../../enums/user";
const router = express.Router();

router
  .route("/")
  .post(auth(ENUM_USER_ROLE.BUYER), OrderController.createOrder)
  .get(
    auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
    OrderController.getOrders
  );
export const OrderRoutes = router;
