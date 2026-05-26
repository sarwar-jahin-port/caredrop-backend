import type { Request, Response, NextFunction } from 'express';
import { prisma } from '../config/prisma.js';

export interface AuthRequest extends Request {
  authUser?: any;
}

export interface Pagination {
  page: number;
  perPage: number;
  offset: number;
  limit: number;
  sort?: string | undefined;
  q?: string | undefined;
}

// extend AuthRequest to possibly include pagination
declare module 'express-serve-static-core' {
  interface Request {
    pagination?: Pagination;
  }
}

export async function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  try {
    const authHeader = req.headers.authorization || '';
    const match = authHeader.match(/^Bearer\s+(.+)$/i);

    if (!match) return res.status(401).json({ message: 'Missing Authorization header' });

    const token = match[1];

    const session = await prisma.session.findUnique({
      where: { token },
      include: { user: true }
    });

    if (!session) return res.status(401).json({ message: 'Invalid session token' });

    if (session.expiresAt && session.expiresAt.getTime() < Date.now()) {
      return res.status(401).json({ message: 'Session expired' });
    }

    req.authUser = session.user;
    next();
  } catch (err) {
    next(err);
  }
}

export function requireRole(role: string) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const user = req.authUser;
    if (!user) return res.status(401).json({ message: 'Not authenticated' });

    if (user.role !== role) return res.status(403).json({ message: 'Forbidden' });

    next();
  };
}
