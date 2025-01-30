import { Request, Response } from 'express';
import User from '../models/user.model';
import { generateToken } from '../utils/jwt.util';
import { hashPassword, comparePassword } from '../utils/bcrypt.util';

// Function to handle user sign-up
export const signUp = async (req: Request, res: Response) => {
  // Destructure username, email, and password from request body
  const { username, email, password } = req.body;
  try {
    // Hash the password before saving
    const hashedPassword = await hashPassword(password);
    // Create a new user in the database
    const user = await User.create({ 
      username, 
      email, 
      password: hashedPassword
    });
    // Respond with success message and user data
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    console.error('Sign-up error:', error);
    // Respond with error message if sign-up fails
    res.status(400).json({ error: 'Error registering user' });
  }
};

// Function to handle user sign-in
export const signIn = async (req: Request, res: Response) => {
  // Destructure email and password from request body
  const { email, password } = req.body;
  try {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ error: 'User not found' });
    // Validate the provided password against the stored hashed password
    const valid = await comparePassword(password, user.get('password') as string);
    if (!valid) return res.status(401).json({ error: 'Invalid credentials' });

    // Generate a token for the authenticated user
    const token = generateToken({ id: user.get('id') as string });
    // Respond with success message and token
    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error('Sign-in error:', error);
    // Respond with error message if sign-in fails
    res.status(400).json({ error: 'Error signing in' });
  }
};
