import jwt from 'jsonwebtoken';

// Function to generate a JWT token
export const generateToken = (payload: object): string => {
  // Sign the payload with a secret and set expiration time
  return jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
};

// Function to verify a JWT token
export const verifyToken = (token: string): any => {
  // Verify the token using the secret
  return jwt.verify(token, process.env.JWT_SECRET || 'secret');
};
