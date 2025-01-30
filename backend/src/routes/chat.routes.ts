import { Router, RequestHandler } from 'express';
import { sendMessage, fetchChatHistory } from '../controllers/chat.controller';
import { authenticate } from '../middleware/auth.middleware';

export const chatRoutes = Router();

// Route to send messages to a specific room, requires authentication
chatRoutes.post('/send-messages/:roomId', authenticate, sendMessage as unknown as RequestHandler);

// Route to fetch chat history for a specific room
chatRoutes.get('/messages/:roomId', fetchChatHistory as RequestHandler);
