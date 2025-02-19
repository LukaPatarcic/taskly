import { eq } from 'drizzle-orm';
import { db } from '@/db/db';
import { Response, Request, NextFunction } from 'express';
import { CustomError } from '@/lib/custom-error';
import { validationResult } from 'express-validator';
import { Task, tasks } from '@/db/schema';
import { StatusCodes } from '@/constants/status-codes';

export async function createTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(
      new CustomError(JSON.stringify(result.array()), StatusCodes.BAD_REQUEST),
    );
  }
  try {
    const task = await db.insert(tasks).values(req.body).returning();
    res.status(StatusCodes.CREATED).json(task);
  } catch {
    next(
      new CustomError('Failed to add note', StatusCodes.INTERNAL_SERVER_ERROR),
    );
  }
}

export async function getTasks(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  try {
    const tasks = await db.query.tasks.findMany({
      with: {
        status: true,
        user: true,
      },
    });

    const groupedTasks = tasks.reduce(
      (acc, task) => {
        const statusName = task?.status?.value as keyof typeof acc;
        if (!statusName) {
          return acc;
        }

        if (!acc[statusName]) {
          acc[statusName] = [];
        }
        acc[statusName].push(task);
        return acc;
      },
      {} as Record<string, Task[]>,
    );
    res.status(StatusCodes.OK).json(groupedTasks);
  } catch {
    next(
      new CustomError(
        'Failed to fetch tasks',
        StatusCodes.INTERNAL_SERVER_ERROR,
      ),
    );
  }
}

export async function getTask(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(
      new CustomError(JSON.stringify(result.array()), StatusCodes.BAD_REQUEST),
    );
  }
  try {
    const task = await db.query.tasks.findFirst({
      where: (users, { eq }) => eq(users.id, +req.params.id),
      with: {
        status: true,
        user: true,
      },
    });
    if (!task) {
      return next(new CustomError('Task not found', StatusCodes.NOT_FOUND));
    }
    res.status(StatusCodes.OK).json(task);
  } catch {
    next(
      new CustomError(
        'Failed to fetch task',
        StatusCodes.INTERNAL_SERVER_ERROR,
      ),
    );
  }
}

export async function deleteTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(
      new CustomError(JSON.stringify(result.array()), StatusCodes.BAD_REQUEST),
    );
  }
  try {
    const task = await db
      .delete(tasks)
      .where(eq(tasks.id, +req.params.id))
      .returning({
        deletedNoteId: tasks.id,
      });
    res.status(StatusCodes.OK).json(task);
  } catch {
    next(
      new CustomError(
        'Failed to delete task',
        StatusCodes.INTERNAL_SERVER_ERROR,
      ),
    );
  }
}

export async function updateTask(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return next(
      new CustomError(JSON.stringify(result.array()), StatusCodes.BAD_REQUEST),
    );
  }
  try {
    const task = await db
      .update(tasks)
      .set(req.body)
      .where(eq(tasks.id, +req.params.id))
      .returning();

    res.status(StatusCodes.CREATED).json(task?.[0] ?? {});
  } catch {
    next(
      new CustomError(
        'Failed to update task',
        StatusCodes.INTERNAL_SERVER_ERROR,
      ),
    );
  }
}
