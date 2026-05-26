import { Router } from 'express';

import { getMedicines } from './medicine.controller.js';

const medicineRouter = Router();

medicineRouter.get('/', getMedicines);

export { medicineRouter };