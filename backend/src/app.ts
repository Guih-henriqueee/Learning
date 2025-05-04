import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import TransactionBody from './Models/InterfacesTransactions';

dotenv.config();

const app = express();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World').status(200);
});

app.post('/CreateTransaction', async (req: Request<unknown, unknown, TransactionBody>, res: Response) => {
    try {
      const { TypeTransaction, IdUser, NameUser, Value } = req.body;
  
      if (!TypeTransaction || !IdUser || !NameUser || !Value) {
        return res.status(400).send({ error: 'Missing required fields.' });
      }
  
      const newTransaction = {
        TypeTransaction,
        IdUser,
        NameUser,
        Value,
        createdAt: new Date(),
      };
  
      return res.status(201).send({ SucessSolicitation: 'Transaction created', data: newTransaction });
    } catch  {
      return res.status(501).send({ error: 'Internal server error' });
    }
  });

  
app.use(express.json());

export default app;
