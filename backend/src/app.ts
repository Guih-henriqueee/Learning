import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();


app.get('/', (req, res) => {
    res.send('Hello World').status(200);
});

app.use(express.json());

export default app;
