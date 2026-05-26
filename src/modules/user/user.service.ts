import { prisma } from '../../config/prisma.js';
import { UserRole as PrismaUserRole } from '../../generated/prisma/enums.js';

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    include: { customerProfile: true, sellerProfile: true }
  });
}

export async function getUsers(page = 1, perPage = 25) {
  const take = Math.min(Math.max(1, perPage), 100);
  const skip = Math.max(0, (page - 1) * take);

  const [total, data] = await Promise.all([
    prisma.user.count(),
    prisma.user.findMany({ skip, take, include: { customerProfile: true, sellerProfile: true } })
  ]);

  return {
    data,
    total
  };
}

export async function updateUserRole(userId: string, role: string) {
  const normalized = String(role).toUpperCase();
  const allowed = Object.values(PrismaUserRole);
  if (!allowed.includes(normalized as any)) throw new Error('Invalid role');

  return prisma.user.update({ where: { id: userId }, data: { role: normalized as any } });
}

export async function createUpdateRequest(userId: string, changes: unknown, reason?: string) {
  return prisma.updateRequest.create({ data: { userId, changes: changes as any, reason } });
}

export async function listUpdateRequests(limit = 100) {
  return prisma.updateRequest.findMany({ take: limit, include: { user: true } });
}

export async function getUpdateRequest(id: string) {
  return prisma.updateRequest.findUnique({ where: { id } });
}

export async function approveUpdateRequest(id: string, reviewerId: string) {
  const reqRecord = await prisma.updateRequest.findUnique({ where: { id } });
  if (!reqRecord) throw new Error('Request not found');

  // Apply a minimal subset of changes to the user record (safe whitelist)
  const changes = reqRecord.changes as Record<string, any>;
  const allowed = ['name', 'email', 'image'];
  const userUpdates: Record<string, any> = {};

  for (const k of allowed) if (k in changes) userUpdates[k] = changes[k];

  await prisma.$transaction([
    prisma.user.update({ where: { id: reqRecord.userId }, data: userUpdates }),
    prisma.updateRequest.update({ where: { id }, data: { status: 'APPROVED', reviewerId, reviewedAt: new Date() } })
  ]);

  return true;
}

export async function rejectUpdateRequest(id: string, reviewerId: string, reason?: string) {
  return prisma.updateRequest.update({ where: { id }, data: { status: 'REJECTED', reviewerId, reason, reviewedAt: new Date() } });
}
