export type IResponseErrorMessage = {
  path: string | number;
  message: string;
};
export type IReturnHandleValidationError = {
  errorMessages: {
    path: string;
    message: string;
  }[];
  statusCode: number;
  message: string;
};
