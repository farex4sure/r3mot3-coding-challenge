import { Request, Response } from 'express';
import Room from '../models/room.model';

// Function to create a new room
export const createRoom = async (req: Request, res: Response) => {
  const { name } = req.body; // Extract room name from request body

  try {
    const room = await Room.create({ name }); // Create a new room in the database
    res.status(201).json({ message: 'Room created', room }); // Respond with success message and room data
  } catch (error) {
    console.error('create-room error:', error); // Log error for debugging
    res.status(400).json({ error: 'Error creating room' }); // Respond with error message
  }
};

// Function to fetch all rooms
export const getAllRooms = async (_req: Request, res: Response) => {
  try {
    const rooms = await Room.findAll(); // Retrieve all rooms from the database
    res.status(200).json(rooms); // Respond with the list of rooms
  } catch (error) {
    res.status(400).json({ error: 'Error fetching rooms' }); // Respond with error message
  }
};
