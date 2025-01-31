import express from 'express';
import { ChatController } from '../controllers/chat.controller';

const chatRoutes = express.Router();
const MessageController = new ChatController();

chatRoutes.post('/send-messages/:roomId', MessageController.sendMessage);
chatRoutes.get('/messages/:roomId', MessageController.fetchChatHistory);

export default chatRoutes;

