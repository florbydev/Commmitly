import type { ErrorRequestHandler } from "express";

export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = 500) {
    super(message);
    this.statusCode = statusCode;
  }
}

export const errorMiddleware: ErrorRequestHandler = (err, _req, res, _next) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message = err instanceof Error ? err.message : "Internal server error";

  res.status(statusCode).json({
    success: false,
    message
  });
};
