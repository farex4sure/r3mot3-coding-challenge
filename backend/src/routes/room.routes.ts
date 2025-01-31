import express from 'express';
import { RoomController } from '../controllers/room.controller';

const roomRoutes = express.Router();
const roomController = new RoomController();

roomRoutes.post('/create-room', roomController.createRoom);
roomRoutes.get('/', roomController.getAllRooms);

export default roomRoutes;