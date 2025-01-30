import User from '../models/user.model';
import { hashPassword, comparePassword } from '../utils/bcrypt.util';
import { generateToken } from '../utils/jwt.util';
import { HttpBadRequestError, HttpUnauthorizedError } from '../utils/errors.util';

export class AuthService {
  public async signUp({ username, email, password }: { username: string; email: string; password: string }) {
    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new HttpBadRequestError('Email already in use');
    }

    // Hash the password
    const hashedPassword = await hashPassword(password);

    // Create user
    const user = await User.create({ username, email, password: hashedPassword });

    // Generate JWT token
    const token = generateToken({ id: user.get('id') as string });

    return { username: user.get('username'), email: user.get('email'), token };
  }

  public async signIn(email: string, password: string) {
    // Find user by email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new HttpUnauthorizedError('Invalid login credentials');
    }

    // Validate password
    const valid = await comparePassword(password, user.get('password') as string);
    if (!valid) {
      throw new HttpUnauthorizedError('Invalid login credentials');
    }

    // Generate JWT token
    const token = generateToken({ id: user.get('id') as string });

    return { username: user.get('username'), email: user.get('email'), token };
  }
}
