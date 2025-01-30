import Room from '../models/room.model';

export const createRoomService = async (name: string) => {
  return await Room.create({ name });
};

export const getAllRoomsService = async () => {
  return await Room.findAll();
};
