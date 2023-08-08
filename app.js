import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import validateEnv from './utils/validateEnv.js';
import bodyParser from 'body-parser';
dotenv.config();
validateEnv();

const app = express();

const corsOptions = {
  origin: ['https://studio.apollographql.com', 'http://localhost:8000'],
  credentials: true,
};

// MIDDLEWARE
app.use(cookieParser());
app.use(bodyParser.json());
app.use(cors(corsOptions));


process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT EXCEPTION 🔥 Shutting down...');
  console.error('Error🔥', err.message);
  process.exit(1);
});

export default app;
