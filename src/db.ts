import {PrismaClient} from '@prisma/client';

export interface Db {
    PrismaClient: typeof PrismaClient
}

export const Db = new PrismaClient();
