import express from 'express';
import { AuthController } from '../controllers/auth.controller';

const authRoutes = express.Router();
const authController = new AuthController();

authRoutes.post('/signup', authController.signUp);
authRoutes.post('/signin', authController.signIn);

export default authRoutes;
