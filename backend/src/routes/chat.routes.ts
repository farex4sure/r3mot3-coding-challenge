import express from 'express';
import { MessageController } from '../controllers/chat.controller';
import { errorHandler } from '../middlewares/errorHandler';

const router = express.Router();

router.post('/send-messages/:roomId', MessageController.sendMessage);
router.get('/messages/:roomId', MessageController.fetchChatHistory);

// Apply the error handler middleware
router.use(errorHandler);

export default router;

