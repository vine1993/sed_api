import {Request, Response, NextFunction} from 'express';
import {PrismaClient} from '@prisma/client';

const db = new PrismaClient();

export const MDatabase = (req: Request,res: Response,next: NextFunction) => {
    res.locals.db = db;
    next();
}
