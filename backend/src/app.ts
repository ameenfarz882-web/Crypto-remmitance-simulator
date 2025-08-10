import express from 'express';
import cors from 'cors';
import conversionRoutes from './routes/conversionRoutes.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/', conversionRoutes);

export default app;