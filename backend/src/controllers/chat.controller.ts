import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { MessageService } from '../services/message.service';
import jwt from 'jsonwebtoken';
import { CustomResponse } from '../types/customResponse';

interface AuthRequest extends Request {
  user?: { id: string };
}

export class ChatController {
  private messageService: MessageService;

  constructor() {
    this.messageService = new MessageService();
  }

  public sendMessage = async (
    req: AuthRequest,
    res: CustomResponse<any>,
    next: NextFunction
  ) => {
    try {
      const token = req.headers.authorization?.split(' ')[1];
      const decodedToken = token ? jwt.verify(token, 'farex') : null;
      const userId = decodedToken ? (decodedToken as { id: string }).id : undefined;
      const { roomId } = req.params;
      const { content } = req.body;
      
      const message = await MessageService.sendMessage(userId as string, roomId, content);
      
      this.send(
        res,
        message,
        StatusCodes.CREATED,
        ReasonPhrases.CREATED,
        'Message sent successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  public fetchChatHistory = async (
    req: Request,
    res: CustomResponse<any>,
    next: NextFunction
  ) => {
    try {
      const { roomId } = req.params;
      const messages = await MessageService.fetchChatHistory(roomId);
      
      this.send(
        res,
        messages,
        StatusCodes.OK,
        ReasonPhrases.OK,
        'Chat history fetched successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  private send = (
    res: CustomResponse<any>,
    data: any,
    statusCode: number,
    statusText: string,
    message: string
  ) => {
    res.status(statusCode).json({
      success: true,
      status: statusText,
      message,
      data,
    });
  };
}
