import { Op } from 'sequelize';
import Message from '../models/message.model';
import Room from '../models/room.model';
import User from '../models/user.model';
import { NotFoundError, BadRequestError, UnauthorizedError } from '../middlewares/errorHandler';

export class MessageService {
  static async sendMessage(userId: string, roomId: string, content: string) {
    if (!userId) {
      throw new UnauthorizedError('Unauthorized');
    }

    const room = await Room.findByPk(roomId);
    if (!room) {
      throw new NotFoundError('Room not found');
    }

    return await Message.create({ content, userId, roomId });
  }

  static async fetchChatHistory(roomId: string) {
    const roomExists = await Room.findOne({ where: { id: roomId } });

    if (!roomExists) {
      throw new NotFoundError('Room not found');
    }

    const messages = await Message.findAll({
      where: { roomId },
      attributes: ['id', 'content', 'createdAt', 'userId'],
      order: [['createdAt', 'ASC']],
      raw: true,
    });

    const userIds = [...new Set(messages.map((msg: any) => msg.userId))];

    if (userIds.length === 0) {
      return messages;
    }

    const users = await User.findAll({
      where: { id: { [Op.in]: userIds } },
      attributes: ['id', 'username', 'email'],
      raw: true,
    });

    const userMap: Record<string, { username: string; email: string }> = users.reduce(
      (acc, user: any) => {
        acc[user.id] = { username: user.username, email: user.email };
        return acc;
      },
      {} as Record<string, { username: string; email: string }>
    );

    return messages.map((msg: any) => ({
      ...msg,
      username: userMap[msg.userId]?.username || 'Unknown',
      email: userMap[msg.userId]?.email || 'Unknown',
    }));
  }
}
