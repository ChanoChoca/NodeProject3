import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js'
import loggerTestRouter from "./routes/loggerTest.router.js";

const app = express();
const PORT = process.env.PORT||8080;

mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://juanicaprioli16:RTQ0YzrJefi4z19y@cluster0.vzzl3.mongodb.net/test?retryWrites=true&w=majority');

app.use(express.json());
app.use(cookieParser());

app.use('/api/users',usersRouter);
app.use('/api/pets',petsRouter);
app.use('/api/adoptions',adoptionsRouter);
app.use('/api/sessions',sessionsRouter);
app.use('/api/mocks', mocksRouter)
app.use('', loggerTestRouter)

app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
