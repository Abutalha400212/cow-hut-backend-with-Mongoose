import express, { Application, NextFunction, Request, Response } from "express";
import cors from "cors";
import httpStatus from "http-status";
import { UserRoute } from "./app/modules/user/user.route";
import globalErrorHandler from "./middleware/globalErrorHandler";
import { CowRoute } from "./app/modules/cow/cow.route";
import { OrderRoute } from "./app/modules/order/order.route";
import { AdminRoute } from "./app/modules/admin/admin.route";
const app: Application = express();
app.use(cors());

// Parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Application routes
app.use("/api/v1/users", UserRoute);
app.use("/api/v1/cows", CowRoute);
app.use("/api/v1/orders", OrderRoute);
app.use("/api/v1/admin", AdminRoute);

// Global Error Handlere
app.use(globalErrorHandler);
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
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

export default app;
