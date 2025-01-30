import { Request, Response, NextFunction } from 'express';
import { createRoomService, getAllRoomsService } from '../services/room.service';

export const createRoom = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name } = req.body;
    const room = await createRoomService(name);
    res.status(201).json({ message: 'Room created', room });
  } catch (error) {
    next(error);
  }
};

export const getAllRooms = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const rooms = await getAllRoomsService();
    res.status(200).json(rooms);
  } catch (error) {
    next(error);
  }
};
