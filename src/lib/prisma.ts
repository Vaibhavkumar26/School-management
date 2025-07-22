// lib/prisma.ts

import { PrismaClient } from '@prisma/client'

/**
 * Use globalThis to store the client during dev to avoid
 * multiple instances due to hot reloads.
 */
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient }
 const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query'] : ['error'],
  })

export default prisma
  
if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}
