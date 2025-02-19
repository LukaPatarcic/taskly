import { Router } from 'express';
import { getUsers } from '@/handlers/users';

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Users API
 */
const usersRouter = Router();

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     description: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
usersRouter.get('/', getUsers);

export default usersRouter;
