import { Request, Response } from 'express';
import Message from '../models/message.model';
import Room from '../models/room.model';
import User from '../models/user.model';

import { Op } from 'sequelize';

interface AuthRequest extends Request {
  user?: { id: string }; // Ensure user object has an `id`
}

export const sendMessage = async (req: AuthRequest, res: Response) => {
  const { roomId } = req.params;
  const { content } = req.body;
  const userId = req.user?.id; // Ensure user is defined before accessing `id`

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const room = await Room.findByPk(roomId);
    if (!room) return res.status(404).json({ error: 'Room not found' });

    const message = await Message.create({ content, userId, roomId });
    res.status(201).json({ status: 'Message sent', message });
  } catch (error) {
    console.error('error-sending-message error:', error);
    res.status(400).json({ error: 'Error sending message' });
  }
};



export const fetchChatHistory = async (req: Request, res: Response) => {
  const { roomId } = req.params;

  try {
    // Check if any message exists for the room (indicating room presence)
    const roomExists = await Message.findOne({ where: { roomId } });

    if (!roomExists) {
      return res.status(404).json({ error: 'Room not found' });
    }

    // Fetch messages with userId
    const messages = await Message.findAll({
      where: { roomId },
      attributes: ['id', 'content', 'createdAt', 'userId'], // Ensure userId is explicitly fetched
      order: [['createdAt', 'ASC']],
      raw: true, // Get plain objects instead of Sequelize instances
    });

    // Extract unique user IDs from messages
    const userIds = [...new Set(messages.map((msg: any) => msg.userId))];

    if (userIds.length === 0) {
      return res.status(200).json(messages); // Return early if no users are involved
    }

    // Fetch user details for these userIds
    const users = await User.findAll({
      where: { id: { [Op.in]: userIds } }, // Use Op.in for multiple UUID lookups
      attributes: ['id', 'username', 'email'],
      raw: true,
    });

    // Create a user lookup map
    const userMap: Record<string, { username: string; email: string }> = users.reduce(
      (acc, user: any) => {
        acc[user.id] = { username: user.username, email: user.email };
        return acc;
      },
      {} as Record<string, { username: string; email: string }>
    );

    // Attach user details to messages
    const enrichedMessages = messages.map((msg: any) => ({
      ...msg,
      username: userMap[msg.userId]?.username || 'Unknown',
      email: userMap[msg.userId]?.email || 'Unknown',
    }));

    res.status(200).json(enrichedMessages);
  } catch (error) {
    console.error('Error fetching chat history:', error);
    res.status(400).json({ error: 'Error fetching chat history' });
  }
};

