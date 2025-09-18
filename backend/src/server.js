// can also be main.js or index.js 
// main entry point of the application

// const express = require('express');
import express from 'express';
import notesRoute from './routes/notesRoute.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv';
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';

dotenv.config();

const app = express();
//configure CORS to allow requests from the frontend, then only rate limiting
app.use(cors({
    origin: 'http://localhost:5173', // replace with your frontend URL
}));
app.use(express.json()); //middleware to parse JSON request body
app.use(rateLimiter); // apply rate limiting middleware to all routes

app.use("/api/notes", notesRoute);

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
})

