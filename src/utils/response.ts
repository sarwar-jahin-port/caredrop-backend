import type { Response } from 'express';

export interface ListMeta {
  total?: number;
  page?: number;
  perPage?: number;
}

export function sendList(res: Response, data: unknown, meta: ListMeta = {}) {
  return res.status(200).json({ data, meta });
}

export function sendOne(res: Response, data: unknown) {
  return res.status(200).json({ data });
}

export function sendCreated(res: Response, data: unknown) {
  return res.status(201).json({ data });
}
