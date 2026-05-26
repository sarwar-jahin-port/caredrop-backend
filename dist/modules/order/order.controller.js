import { listOrders } from './order.service.js';
export async function getOrders(_req, res, next) {
    try {
        const orders = await listOrders();
        res.status(200).json({
            data: orders
        });
    }
    catch (error) {
        next(error);
    }
}
