import { Request, Response } from 'express';
import User from '../models/user.model';
import { generateToken } from '../utils/jwt.util';
import { hashPassword, comparePassword } from '../utils/bcrypt.util';

export const signUp = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await hashPassword(password);
    const user = await User.create({ 
      username, 
      email, 
      password: hashedPassword
    });
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    console.error('Sign-up error:', error);
    res.status(400).json({ error: 'Error registering user' });
  }
};

export const signIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    // `user` now has `password` and `id` correctly typed
    const valid = await comparePassword(password, user.get('password') as string);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    const token = generateToken({ id: user.get('id') as string });
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Sign-in error:', error);
    res.status(400).json({ error: 'Error signing in' });
  }
};
