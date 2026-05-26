import type { Request, Response, NextFunction } from 'express';

import { listOrders } from './order.service.js';

export async function getOrders(_req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await listOrders();

    res.status(200).json({
      data: orders
    });
  } catch (error) {
    next(error);
  }
}