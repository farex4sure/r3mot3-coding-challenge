import { Request, Response } from 'express';
import Room from '../models/room.model';

export const createRoom = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const room = await Room.create({ name });
    res.status(201).json({ message: 'Room created', room });
  } catch (error) {
    console.error('create-room error:', error);
    res.status(400).json({ error: 'Error creating room' });
  }
};

export const getAllRooms = async (_req: Request, res: Response) => {
  try {
    const rooms = await Room.findAll();
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: 'Error fetching rooms' });
  }
};
