import express, { urlencoded, json } from 'express';
import { notFound } from '@/middleware/not-found';
import { error } from '@/middleware/error';
import tasksRouter from '@/routes/tasks';
import statusesRouter from '@/routes/statuses';
import usersRouter from '@/routes/users';
import cors from 'cors';
import { setupSwagger } from '@/swagger';

const app = express();
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

setupSwagger(app);

app.use('/api/tasks', tasksRouter);
app.use('/api/statuses', statusesRouter);
app.use('/api/users', usersRouter);

app.use(notFound);
app.use(error);

export default app;
