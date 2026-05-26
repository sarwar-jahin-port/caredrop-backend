import { listMedicines } from './medicine.service.js';
export async function getMedicines(_req, res, next) {
    try {
        const medicines = await listMedicines();
        res.status(200).json({
            data: medicines
        });
    }
    catch (error) {
        next(error);
    }
}
