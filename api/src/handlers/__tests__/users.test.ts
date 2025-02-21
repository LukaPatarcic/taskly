import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../../server';

describe('GET /api/users', () => {
  it('should return a list of users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it('should return a 404 for an invalid endpoint', async () => {
    const response = await request(app).get('/api/invalid-endpoint');
    expect(response.status).toBe(404);
  });
});
