import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import handleValidationError from "../errors/handleValidationError";
import { IResponseErrorMessage } from "../interfaces/error.interface";
import config from "../config";

const globalErrorHandler: ErrorRequestHandler = (
  error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 400;
  let message = "Something went wrong";
  let errorMessage: IResponseErrorMessage[] = [];

  if (error.name === "ValidationError") {
    const simplifiedError = handleValidationError(error);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessages;
  }
  res.status(statusCode).json({
    statusCode,
    message,
    errorMessage,
    stack: config.env !== "production" ? error.stack : undefined,
  });
  next();
};

export default globalErrorHandler;
