import { db } from '@/db/db';
import { Response, Request, NextFunction } from 'express';
import { CustomError } from '@/lib/custom-error';
import { StatusCodes } from '@/constants/status-codes';

export async function getStatuses(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const statuses = await db.query.statuses.findMany();

    res.status(StatusCodes.OK).json(statuses);
  } catch {
    next(
      new CustomError(
        'Failed to fetch tasks',
        StatusCodes.INTERNAL_SERVER_ERROR,
      ),
    );
  }
}
