import type { Response, NextFunction } from 'express';
import type { AuthRequest } from '../../middleware/authorize.js';
import * as userService from './user.service.js';
import { sendList, sendOne, sendCreated } from '../../utils/response.js';

export async function getMe(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = req.authUser;
    const data = await userService.getUserById(user.id);
    return sendOne(res, data);
  } catch (err) {
    next(err);
  }
}

export async function getUser(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    const data = await userService.getUserById(id);
    if (!data) return res.status(404).json({ message: 'User not found' });
    return sendOne(res, data);
  } catch (err) {
    next(err);
  }
}

export async function listUsers(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const reqAny = _req as any;
    const pagination = reqAny.pagination;
    const page = pagination?.page ?? 1;
    const perPage = pagination?.perPage ?? 25;

    const result = await userService.getUsers(page, perPage);

    return sendList(res, result.data, { total: result.total, page, perPage });
  } catch (err) {
    next(err);
  }
}

export async function patchUserRole(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    const role = String(req.body.role);
    const updated = await userService.updateUserRole(id, role);
    return sendOne(res, updated);
  } catch (err) {
    next(err);
  }
}

export async function postUpdateRequest(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const user = req.authUser;
    const { changes, reason } = req.body;
    const created = await userService.createUpdateRequest(user.id, changes, reason);
    return sendCreated(res, created);
  } catch (err) {
    next(err);
  }
}

export async function listRequests(_req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const data = await userService.listUpdateRequests();
    return sendList(res, data);
  } catch (err) {
    next(err);
  }
}

export async function approveRequest(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    const reviewer = req.authUser;
    await userService.approveUpdateRequest(id, String(reviewer.id));
    return sendOne(res, { ok: true });
  } catch (err) {
    next(err);
  }
}

export async function rejectRequest(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const id = String(req.params.id);
    const { reason } = req.body;
    const reviewer = req.authUser;
    await userService.rejectUpdateRequest(id, String(reviewer.id), reason);
    return sendOne(res, { ok: true });
  } catch (err) {
    next(err);
  }
}
