"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const user_route_1 = require("../modules/user/user.route");
const admin_route_1 = require("../modules/admin/admin.route");
const order_route_1 = require("../modules/order/order.route");
const cow_route_1 = require("../modules/cow/cow.route");
const router = express_1.default.Router();
const moduleRoutes = [
    {
        path: "/orders",
        route: order_route_1.OrderRoutes,
    },
    {
        path: "/cows",
        route: cow_route_1.CowRoutes,
    },
    {
        path: "/admins",
        route: admin_route_1.AdminRoutes,
    },
    {
        path: "/users",
        route: user_route_1.UserRoutes,
    },
    {
        path: "/auth",
        route: auth_route_1.AuthRoutes,
    },
];
moduleRoutes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
