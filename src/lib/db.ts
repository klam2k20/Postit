import { PrismaClient } from '@prisma/client';

declare global {
  var cachedPrisma: PrismaClient | undefined
}

let db: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient();
} else {
  db = global.cachedPrisma || new PrismaClient();
}

export default db;