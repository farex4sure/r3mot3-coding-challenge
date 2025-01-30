import express from 'express';
import { createRoom, getAllRooms } from '../controllers/room.controller';

const router = express.Router();

router.post('/create-room', createRoom);
router.get('/', getAllRooms);

export default router;
