import { Request, Response } from 'express';
import { CustomError } from '@/lib/custom-error';

export function error(err: CustomError, req: Request, res: Response) {
  try {
    const msg = JSON.parse(err.message);
    res.status(err.status).json({ msg });
  } catch {
    res.status(err.status).json({ msg: err.message });
  }
}
