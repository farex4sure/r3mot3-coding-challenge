// Importing necessary modules from express and room controller
import { Router } from 'express';
import { createRoom, getAllRooms } from '../controllers/room.controller';

// Creating a new router instance for room routes
export const roomRoutes = Router();

// Route to create a new room
roomRoutes.post('/create-room', createRoom);

// Route to get all rooms
roomRoutes.get('/', getAllRooms);
