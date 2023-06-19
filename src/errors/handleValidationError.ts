import mongoose from "mongoose";
import httpStatus from "http-status";
import {
  IResponseErrorMessage,
  IReturnHandleValidationError,
} from "../interfaces/error.interface";
const handleValidationError = (
  error: mongoose.Error.ValidationError
): IReturnHandleValidationError => {
  const errors: IResponseErrorMessage[] = Object.values(error.errors).map(
    (
      el: mongoose.Error.CastError | mongoose.Error.ValidatorError
    ): IResponseErrorMessage => {
      return {
        path: el?.path,
        message: el?.message,
      };
    }
  );
  return {
    statusCode: httpStatus.BAD_REQUEST,
    message: "Validation Error",
    errorMessages: errors,
  };
};

export default handleValidationError;
