import { Request, Response, NextFunction } from "express";

// Basic Error Handler
export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Something went wrong";

  res.status(statusCode).json({
    message,
  });
};

// 404 Handler
export const notFound = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  res.status(404).json({
    message: `Route ${req.originalUrl} not found`,
  });
};
