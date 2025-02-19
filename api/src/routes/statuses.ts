import { Router } from 'express';
import { getStatuses } from '@/handlers/statuses';

/**
 * @swagger
 * tags:
 *   name: Statuses
 *   description: Statuses API
 */
const statusesRouter = Router();

/**
 * @swagger
 * /api/statuses:
 *   get:
 *     summary: Get all statuses
 *     tags: [Statuses]
 *     description: Retrieve a list of statuses
 *     responses:
 *       200:
 *         description: A list of statuses
 */
statusesRouter.get('/', getStatuses);

export default statusesRouter;
