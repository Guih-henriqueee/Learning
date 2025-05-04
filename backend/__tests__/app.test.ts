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
  it('should return 201 when a deposit transaction is created successfully', async () => {
    const res = await request(app).post('/CreateTransaction').send({
      TypeTransaction: 'deposit',
      IdUser: 1,
      NameUser: 'João',
      Value: 200.50
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('SuccessSolicitation');
    expect(res.body.data).toMatchObject({
      TypeTransaction: 'deposit',
      IdUser: 1,
      NameUser: 'João',
      Value: 200.50
    });
  });

  it('should return 200 when an extract is requested successfully', async () => {
    const res = await request(app).post('/CreateTransaction').send({
      TypeTransaction: 'extract',
      IdUser: 2,
      NameUser: 'Maria'
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('SuccessSolicitation');
    expect(res.body.data).toHaveProperty('transactions');
  });

  it('should return 400 if required fields are missing for deposit', async () => {
    const res = await request(app).post('/CreateTransaction').send({
      TypeTransaction: 'deposit',
      IdUser: 3
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if required fields are missing for extract', async () => {
    const res = await request(app).post('/CreateTransaction').send({
      TypeTransaction: 'extract',
      NameUser: 'Carlos'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 for an invalid TypeTransaction', async () => {
    const res = await request(app).post('/CreateTransaction').send({
      TypeTransaction: 'invalidType',
      IdUser: 1,
      NameUser: 'Ana',
      Value: 100.00
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if Value is a string instead of number', async () => {
    const res = await request(app).post('/CreateTransaction').send({
      TypeTransaction: 'deposit',
      IdUser: 1,
      NameUser: 'João',
      Value: 'not_a_number'
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if Value is negative', async () => {
    const res = await request(app).post('/CreateTransaction').send({
      TypeTransaction: 'deposit',
      IdUser: 1,
      NameUser: 'João',
      Value: -100
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 400 if NameUser is null', async () => {
    const res = await request(app).post('/CreateTransaction').send({
      TypeTransaction: 'deposit',
      IdUser: 1,
      NameUser: null,
      Value: 50
    });

    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('error');
  });

  it('should return 501 if an internal error occurs', async () => {
    // Força erro interno simulando TypeTransaction undefined
    const res = await request(app).post('/CreateTransaction').send(undefined);

    expect(res.statusCode).toBe(501);
    expect(res.body).toHaveProperty('error');
  });
});
