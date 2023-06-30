import express from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { UserRoutes } from "../modules/user/user.route";
import { AdminRoutes } from "../modules/admin/admin.route";
import { OrderRoutes } from "../modules/order/order.route";
import { CowRoutes } from "../modules/cow/cow.route";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/orders",
    route: OrderRoutes,
  },
  {
    path: "/cows",
    route: CowRoutes,
  },

  {
    path: "/admin",
    route: AdminRoutes,
  },
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
