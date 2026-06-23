import { Request, Response, NextFunction } from "express";

import { ZodError } from "zod";

import { AppError } from "../common/errors/app-error";
import { ErrorCode } from "../common/errors/error-codes";

export const errorMiddleware = (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      success: false,
      data: null,
      error: error.errorCode,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      success: false,
      data: null,
      error: ErrorCode.INVALID_REQUEST,
    });
  }

  return res.status(500).json({
    success: false,
    data: null,
    error: ErrorCode.INTERNAL_SERVER_ERROR,
  });
};
