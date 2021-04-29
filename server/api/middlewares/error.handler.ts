import { Request, Response, NextFunction } from 'express';
import { logger } from '../../common';
import * as express from 'express';

export default function errorHandler(err: any, _req: Request, res: Response, _next: NextFunction): void {
  const errores = err.errors || [{ message: err.message }];
  res.status(err.status || 500).json({ errores });
}

export function notFound(err: any, _req: Request, res: Response, next: NextFunction): void {
  logger.warn(err);
  res.status(404).json({
    error: 'Not found',
  });
  next();
}

export function unauthorized(err: any, _req: express.Request, res: express.Response, next: express.NextFunction): void {
  logger.warn(err);
  if (err.name === 'UnauthorizedError') {
    res.status(401).json({
      error: 'You are unauthorized',
    });
  }
  next();
}

export function errors(err: any, _req: express.Request, res: express.Response, next: express.NextFunction): void {
  res.status(err.status || 500).json({
    error: err.message,
  });
  next();
}
