import { Router, RequestHandler } from 'express';
import { sendMessage, fetchChatHistory } from '../controllers/chat.controller';
import { authenticate } from '../middleware/auth.middleware';

export const chatRoutes = Router();

chatRoutes.post('/send-messages/:roomId', authenticate, sendMessage as unknown as RequestHandler);
chatRoutes.get('/messages/:roomId', fetchChatHistory as RequestHandler);
