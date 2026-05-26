import express from 'express';
import cors from 'cors';
import { toNodeHandler } from 'better-auth/node';
import helmet from 'helmet';
import morgan from 'morgan';

import { auth } from './auth.js';
import { medicineRouter } from './modules/medicine/medicine.route.js';
import { orderRouter } from './modules/order/order.route.js';
import { notFound, errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));

app.all('/api/auth/*', toNodeHandler(auth));

app.use(express.json());

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