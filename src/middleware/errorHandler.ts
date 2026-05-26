import type { NextFunction, Request, Response } from 'express';

export function notFound(_req: Request, res: Response, _next: NextFunction) {
  res.status(404).json({
    message: 'Route not found'
  });
}

export function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction) {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: error.message || 'Internal Server Error'
  });
}