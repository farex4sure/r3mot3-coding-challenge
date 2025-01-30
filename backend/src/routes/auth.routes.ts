import { Router, RequestHandler } from 'express';
import { signUp, signIn } from '../controllers/auth.controller';

export const authRoutes = Router();

authRoutes.post('/signup', signUp as RequestHandler);
authRoutes.post('/signin', signIn as RequestHandler);
 