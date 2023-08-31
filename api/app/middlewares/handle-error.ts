import { NextFunction, Request, Response } from "express";
import { AppError } from "../utils/errors";

export const handleError = (error: Error, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500;
  if (error instanceof AppError) {
    statusCode = error.getStatusCode()
  }

  return res.status(statusCode).json({
    success: false,
    message: error.message
  })
}

export const handleUnknownRoute = (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: `Can't find ${req.originalUrl} on this server!`
  })
}