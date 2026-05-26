import { Router } from 'express';
import { requireAuth, requireRole } from '../../middleware/authorize.js';
import parsePagination from '../../middleware/pagination.js';
import * as controller from './user.controller.js';
import { UserRole as PrismaUserRole } from '../../generated/prisma/enums.js';

const router = Router();

// user-facing
router.get('/me', requireAuth, controller.getMe);
router.post('/me/requests', requireAuth, controller.postUpdateRequest);

// admin
router.get('/', requireAuth, parsePagination, requireRole(PrismaUserRole.ADMIN), controller.listUsers);
router.get('/requests', requireAuth, requireRole(PrismaUserRole.ADMIN), controller.listRequests);
router.get('/:id', requireAuth, requireRole(PrismaUserRole.ADMIN), controller.getUser);
router.patch('/:id/role', requireAuth, requireRole(PrismaUserRole.ADMIN), controller.patchUserRole);
router.post('/requests/:id/approve', requireAuth, requireRole(PrismaUserRole.ADMIN), controller.approveRequest);
router.post('/requests/:id/reject', requireAuth, requireRole(PrismaUserRole.ADMIN), controller.rejectRequest);

export { router as userRouter };
