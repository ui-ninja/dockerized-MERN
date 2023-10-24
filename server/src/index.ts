import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';

import appRouter from './routes';

dotenv.config({
  path: 'server.env',
});

const app = express();
const port = process.env.PORT ?? 3001;

// CORS
app.use(cors());

// Body parser
app.use(bodyParser.json());

async function start() {
  // Mongo
  if (process.env.MONGODB_URL) {
    await mongoose.connect(process.env.MONGODB_URL);
  } else {
    throw new Error('MONGODB_URL is missing');
  }

  app.use('/', appRouter());

  app.listen(port, () => console.log(`[Server]:: Server started on ${port}`));
}

start().catch((err) => console.log(err));
