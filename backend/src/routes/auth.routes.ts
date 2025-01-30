import { Router, RequestHandler } from 'express';
import { signUp, signIn } from '../controllers/auth.controller';

export const authRoutes = Router();

// Route for user signup
authRoutes.post('/signup', signUp as RequestHandler);

// Route for user signin
authRoutes.post('/signin', signIn as RequestHandler);
 