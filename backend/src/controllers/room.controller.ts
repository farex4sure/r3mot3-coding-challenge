import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { createRoomService, getAllRoomsService } from '../services/room.service';
import { CustomResponse } from '../types/customResponse';

export class RoomController {
  public createRoom = async (
    req: Request,
    res: CustomResponse<any>,
    next: NextFunction
  ) => {
    try {
      const { name } = req.body;
      const room = await createRoomService(name);
      this.send(
        res,
        room,
        StatusCodes.CREATED,
        ReasonPhrases.CREATED,
        'Room created successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  public getAllRooms = async (
    _req: Request,
    res: CustomResponse<any>,
    next: NextFunction
  ) => {
    try {
      const rooms = await getAllRoomsService();
      this.send(
        res,
        rooms,
        StatusCodes.OK,
        ReasonPhrases.OK,
        'Rooms fetched successfully'
      );
    } catch (error) {
      next(error);
    }
  };

  private send = (
    res: CustomResponse<any>,
    data: any,
    statusCode: number,
    statusText: string,
    message: string
  ) => {
    res.status(statusCode).json({
      success: true,
      status: statusText,
      message,
      data,
    });
  };
}
