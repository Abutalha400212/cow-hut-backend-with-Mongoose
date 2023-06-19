export type IResponseErrorMessage = {
  path: string | number;
  message: string;
};
export type IReturnHandleValidationError = {
  statusCode: number;
  message: string;
  errorMessages: IResponseErrorMessage[];
};
