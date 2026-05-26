import type { Request, Response, NextFunction } from 'express';

export interface Pagination {
  page: number;
  perPage: number;
  offset: number;
  limit: number;
  sort?: string;
  q?: string;
}

export default function parsePagination(req: Request, _res: Response, next: NextFunction) {
  const rawPage = Array.isArray(req.query.page) ? req.query.page[0] : req.query.page;
  const rawPerPage = Array.isArray(req.query.perPage) ? req.query.perPage[0] : req.query.perPage;
  const rawSort = Array.isArray(req.query.sort) ? req.query.sort[0] : req.query.sort;
  const rawQ = Array.isArray(req.query.q) ? req.query.q[0] : req.query.q;

  const page = Math.max(1, Number(rawPage ?? 1) || 1);
  let perPage = Number(rawPerPage ?? 25) || 25;
  if (perPage < 1) perPage = 1;
  if (perPage > 100) perPage = 100;

  const offset = (page - 1) * perPage;

  (req as any).pagination = {
    page,
    perPage,
    offset,
    limit: perPage,
    sort: rawSort ? String(rawSort) : undefined,
    q: rawQ ? String(rawQ) : undefined
  } as Pagination;

  next();
}
