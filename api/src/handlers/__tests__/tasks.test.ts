import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../server';

describe('Tasks API', () => {
  let taskId: number;

  describe('GET /api/tasks', () => {
    it('should return a list of tasks', async () => {
      const response = await request(app).get('/api/tasks');
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
      expect(typeof response.body).toBe('object');
    });
  });

  describe('POST /api/tasks', () => {
    it('should create a new task', async () => {
      const newTask = {
        title: 'New Task',
        description: 'Task description',
        statusId: 1,
        userId: 1,
      };
      const response = await request(app).post('/api/tasks').send(newTask);
      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.id).toBeDefined();
      taskId = response.body.id;
    });
  });

  describe('PUT /api/tasks/:id', () => {
    it('should update an existing task', async () => {
      const updatedTask = {
        title: 'Updated Task',
        description: 'Updated description',
        statusId: 1,
        userId: 1,
      };
      const response = await request(app)
        .put(`/api/tasks/${taskId}`)
        .send(updatedTask);
      expect(response.status).toBe(201);
      expect(response.body).toBeDefined();
      expect(response.body.title).toBe(updatedTask.title);
      expect(response.body.description).toBe(updatedTask.description);
    });
  });

  describe('DELETE /api/tasks/:id', () => {
    it('should delete an existing task', async () => {
      const response = await request(app).delete(`/api/tasks/${taskId}`);
      expect(response.status).toBe(200);
      expect(response.body).toBeDefined();
    });
  });
});
