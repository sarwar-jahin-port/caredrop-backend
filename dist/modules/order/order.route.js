import { Router } from 'express';
import { getOrders } from './order.controller.js';
const orderRouter = Router();
orderRouter.get('/', getOrders);
export { orderRouter };
