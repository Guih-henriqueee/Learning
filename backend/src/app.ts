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
        const allowedTypeTransaction = ['deposit', 'extract'];

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(501).send({ error: 'Request body is missing or empty.' });
        }
        if (!TypeTransaction || !allowedTypeTransaction.includes(TypeTransaction)) {
            return res.status(400).send({ error: 'Invalid or missing TypeTransaction.' });
        }

        if (TypeTransaction === 'deposit') {
            if (!IdUser || !NameUser || !Value) {
                return res.status(400).send({ error: `Missing required fields for '${TypeTransaction}'.` });
            }
            if (typeof Value !== 'number' || isNaN(Value) || Value <= 0) {
                return res.status(400).send({ error: 'Value must be a positive number.' });
            };

            const newTransaction = {
                TypeTransaction,
                IdUser,
                NameUser,
                Value,
                createdAt: new Date(),
            };

            return res.status(201).send({ SuccessSolicitation: 'Transaction created', data: newTransaction });
        }

        if (TypeTransaction === 'extract') {
            if (!IdUser || !NameUser) {
                return res.status(400).send({ error: 'Missing required fields for extract.' });
            }

            const fakeExtractData = {
                IdUser,
                NameUser,
                transactions: [],
            };

            return res.status(200).send({ SuccessSolicitation: 'Extract generated', data: fakeExtractData });
        }

    } catch (error) {
        console.error(error);
        return res.status(501).send({ error: 'Internal server error' });
    }
});

app.use(express.json());

export default app;
