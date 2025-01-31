import jwt from 'jsonwebtoken';

// Function to generate a JWT token
export const generateToken = (payload: object): string => {
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
};

// Function to verify a JWT token
export const verifyToken = (token: string): any => {
  return jwt.verify(token, process.env.JWT_SECRET || 'secret');
};
