import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ReasonPhrases } from 'http-status-codes';
import { AuthService } from '../services/auth.service';
import { CustomResponse } from '../types/customResponse';

export class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
  }

  public signUp = async (
    req: Request,
    res: CustomResponse<any>,
    next: NextFunction
  ) => {
    try {
      const user = await this.authService.signUp(req.body);
      this.send(
        res,
        user,
        StatusCodes.CREATED,
        ReasonPhrases.CREATED,
        'User registered successfully'
      );
    } catch (e) {
      next(e); // Pass error to middleware
    }
  };

  public signIn = async (
    req: Request,
    res: CustomResponse<any>,
    next: NextFunction
  ) => {
    try {
      const { email, password } = req.body;
      const loginData = await this.authService.signIn(email, password);
      this.send(
        res,
        loginData,
        StatusCodes.OK,
        ReasonPhrases.OK,
        'Login successful'
      );
    } catch (e) {
      next(e); // Pass error to middleware
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
