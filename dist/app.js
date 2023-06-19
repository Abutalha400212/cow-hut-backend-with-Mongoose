"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const user_route_1 = require("./app/modules/user/user.route");
const globalErrorHandler_1 = __importDefault(require("./middleware/globalErrorHandler"));
const cow_route_1 = require("./app/modules/cow/cow.route");
const order_route_1 = require("./app/modules/order/order.route");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
// Parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Application routes
app.use("/api/v1/", user_route_1.UserRoute);
app.use("/api/v1/cows", cow_route_1.CowRoute);
app.use("/api/v1/orders", order_route_1.OrderRoute);
// Global Error Handlere
app.use(globalErrorHandler_1.default);
app.use((req, res, next) => {
    res.status(http_status_1.default.NOT_FOUND).json({
        success: false,
        message: "Not Found",
        errormessage: [
            {
                path: req.originalUrl,
                message: "Api not found",
            },
        ],
    });
    next();
});
exports.default = app;
