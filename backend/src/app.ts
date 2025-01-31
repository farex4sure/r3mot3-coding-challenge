import express from 'express';
import dotenv from 'dotenv';
import { json, urlencoded } from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';

import authRoutes from './routes/auth.routes';
import roomRoutes from './routes/room.routes';
import chatRoutes from './routes/chat.routes';

dotenv.config();


const app = express();
app.get('/', (req, res) => {
    res.send('Server is running!');
});

// Middleware
app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/chats', chatRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
