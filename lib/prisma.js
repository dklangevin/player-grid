import { PrismaClient } from '@prisma/client';

let global = { prisma: null };

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV === 'development') global.prisma = prisma;

export default prisma;
