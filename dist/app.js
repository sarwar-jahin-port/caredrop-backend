import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { medicineRouter } from './modules/medicine/medicine.route.js';
import { orderRouter } from './modules/order/order.route.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.get('/health', (_req, res) => {
    res.json({
        ok: true,
        service: 'CareDrop API'
    });
});
app.use('/api/medicine', medicineRouter);
app.use('/api/orders', orderRouter);
app.use(notFound);
app.use(errorHandler);
export { app };
