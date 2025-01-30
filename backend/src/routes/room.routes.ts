import { Router } from 'express';
import { createRoom, getAllRooms } from '../controllers/room.controller';

export const roomRoutes = Router();

roomRoutes.post('/create-room', createRoom);
roomRoutes.get('/', getAllRooms);
