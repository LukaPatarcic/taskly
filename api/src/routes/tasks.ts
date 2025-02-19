import { Router } from 'express';

import {
  validateIdParam,
  validateTaskDescription,
  validateTaskStatusId,
  validateTaskTitle,
  validateTaskUserId,
} from '@/lib/validator-functions';
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from '@/handlers/tasks';

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Tasks API
 */
const tasksRouter = Router();

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by id
 *     tags: [Tasks]
 *     description: Retrieve a task by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A task by id
 */
tasksRouter.get('/:id', validateIdParam(), getTask);

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get tasks
 *     tags: [Tasks]
 *     description: Retrieve all tasks
 *     responses:
 *       200:
 *         description: All tasks
 */
tasksRouter.get('/', getTasks);

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create task
 *     tags: [Tasks]
 *     description: Create a task
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the ticket.
 *                 example: Example title
 *               description:
 *                 type: string
 *                 description: Description of the ticket.
 *                 example: Example description
 *               statusId:
 *                 type: integer
 *                 description: Status of the ticket.
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 description: User of the ticket.
 *                 example: 1
 *     responses:
 *       200:
 *         description: New task
 */
tasksRouter.post(
  '/',
  validateTaskDescription(),
  validateTaskTitle(),
  validateTaskUserId(),
  validateTaskStatusId(),
  createTask,
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     description: Update a task by id
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Title of the ticket.
 *                 example: Example title
 *               description:
 *                 type: string
 *                 description: Description of the ticket.
 *                 example: Example description
 *               statusId:
 *                 type: integer
 *                 description: Status of the ticket.
 *                 example: 1
 *               userId:
 *                 type: integer
 *                 description: User of the ticket.
 *                 example: 1
 *     responses:
 *       200:
 *         description: Updated task
 */
tasksRouter.put(
  '/:id',
  validateIdParam(),
  validateTaskDescription(),
  validateTaskTitle(),
  validateTaskUserId(),
  validateTaskStatusId(),
  updateTask,
);

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Numeric ID of the user to retrieve.
 *         schema:
 *           type: integer
 *     description: Delete a task
 *     responses:
 *       200:
 *         description: Deleted task
 */
tasksRouter.delete('/:id', validateIdParam(), deleteTask);

export default tasksRouter;
