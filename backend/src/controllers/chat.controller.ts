import { Request, Response, NextFunction } from 'express';
import { MessageService } from '../services/message.service';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: { id: string };
}

export class MessageController {
  static async sendMessage(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decodedToken = token ? jwt.verify(token, 'farex') : null;
      const userId = decodedToken ? (decodedToken as { id: string }).id : undefined;
      const { roomId } = req.params;
      const { content } = req.body;
      const message = await MessageService.sendMessage(userId as string, roomId, content);
      res.status(201).json({ status: 'Message sent', message });
    } catch (error) {
      next(error);
    }
  }

  static async fetchChatHistory(req: Request, res: Response, next: NextFunction) {
    try {
      const { roomId } = req.params;
      const messages = await MessageService.fetchChatHistory(roomId);
      res.status(200).json(messages);
    } catch (error) {
      next(error);
    }
  }
}
