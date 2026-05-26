import type { Request, Response, NextFunction } from 'express';

import { listMedicines } from './medicine.service.js';

export async function getMedicines(_req: Request, res: Response, next: NextFunction) {
  try {
    const medicines = await listMedicines();

    res.status(200).json({
      data: medicines
    });
  } catch (error) {
    next(error);
  }
}