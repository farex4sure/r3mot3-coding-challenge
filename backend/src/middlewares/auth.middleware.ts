import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/jwt.util';

// Define an interface that extends the Request object to include user information
export interface AuthRequest extends Request {
  user?: { id: string };
}

// Middleware function to authenticate requests
export const authenticate = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // Retrieve the authorization header from the request
  const authHeader = req.headers.authorization;

  // Check if the authorization header is present and starts with 'Bearer '
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Access denied. No token provided.' });
    return;
  }

  // Extract the token from the authorization header
  const token = authHeader.split(' ')[1];
  try {
    // Verify the token and decode the payload
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};
