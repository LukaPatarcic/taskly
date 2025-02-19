import { db } from '@/db/db';
import { Response, Request, NextFunction } from 'express';
import { CustomError } from '@/lib/custom-error';
import { StatusCodes } from '@/constants/status-codes';

export async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const users = await db.query.users.findMany();
    res.status(StatusCodes.OK).json(users);
  } catch {
    next(
      new CustomError(
        'Failed to fetch tasks',
        StatusCodes.INTERNAL_SERVER_ERROR,
      ),
    );
  }
}
