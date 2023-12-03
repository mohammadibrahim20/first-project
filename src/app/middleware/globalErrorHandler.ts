/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { NextFunction, Request, Response } from 'express';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = err.statusCode || 500;
  const message: string = err.message || 'Something went wrong';
  return res.status(statusCode).json({
    success: false,
    message: message,
    err: err,
  });
};

export default globalErrorHandler;
