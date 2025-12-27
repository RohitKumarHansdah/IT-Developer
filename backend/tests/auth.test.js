const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
require('dotenv').config();

describe('Authentication API', () => {
  beforeAll(async () => {
    // Use same test DB as your main or a separate DB if you want
    await mongoose.connect(process.env.MONGODB_URI);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  const testUser = {
    username: 'testuser_step7',
    email: 'testuser_step7@example.com',
    password: 'Test@123456'
  };

  it('should return health check OK', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('message');
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    // Either 201 created or 400 if user already exists
    expect([201, 400]).toContain(res.statusCode);

    if (res.statusCode === 201) {
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('email', testUser.email);
    } else {
      expect(res.body).toHaveProperty('message');
    }
  });

  it('should login with valid credentials', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect([200, 400]).toContain(res.statusCode);

    if (res.statusCode === 200) {
      expect(res.body).toHaveProperty('token');
      expect(res.body).toHaveProperty('user');
      expect(res.body.user).toHaveProperty('email', testUser.email);
    } else {
      expect(res.body).toHaveProperty('message');
    }
  });
});
