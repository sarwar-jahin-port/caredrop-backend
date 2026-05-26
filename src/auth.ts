import { betterAuth } from 'better-auth';
import { bearer } from 'better-auth/plugins';
import { prismaAdapter } from '@better-auth/prisma-adapter';

import { prisma } from './config/prisma.js';
import { UserRole as PrismaUserRole } from './generated/prisma/enums.js';

const betterAuthSecret = process.env.BETTER_AUTH_SECRET;
const betterAuthUrl = process.env.BETTER_AUTH_URL;
const authRoles = Object.values(PrismaUserRole);

if (!betterAuthSecret) {
  throw new Error('BETTER_AUTH_SECRET is required');
}

if (!betterAuthUrl) {
  throw new Error('BETTER_AUTH_URL is required');
}

export const auth = betterAuth({
  baseURL: betterAuthUrl,
  secret: betterAuthSecret,
  database: prismaAdapter(prisma, { provider: 'postgresql' }),
  plugins: [bearer()],
  advanced: {
    database: {
      generateId: 'uuid',
      disableCSRFCheck: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: authRoles,
        required: false,
        input: false,
        defaultValue: PrismaUserRole.CUSTOMER,
      },
    },
  },
});