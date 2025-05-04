
import request from 'supertest';
import app from '../src/app';

describe('GET /', () => {
  it('should return Hello World', async () => {
    const res = await request(app).get('/');
    expect(res.text).toBe('Hello World');
    expect(res.statusCode).toBe(200);
  });
});



describe('POST /CreateTransaction', () => {
  it('should return 201 when transaction is created successfully', async () => {
    const res = await request(app).post('/CreateTransaction').send({
      TypeTransaction: 'deposit',
      IdUser: 1,
      NameUser: 'João',
      Value: 200.50
    });

    expect(res.body).toHaveProperty('SucessSolicitation');
    expect(res.statusCode).toBe(201);
  });

  it('should return 400 if missing required fields', async () => {
    const res = await request(app).post('/CreateTransaction').send({
      IdUser: 1,
      Value: 100.00
    });

    expect(res.body).toHaveProperty('error');
    expect(res.statusCode).toBe(400);
  });
});