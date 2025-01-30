import bcrypt from 'bcrypt';

// Function to hash a password
export const hashPassword = async (password: string): Promise<string> => {
  // Hash the password using bcrypt with a salt rounds of 10
  return await bcrypt.hash(password, 10);
};

// Function to compare a password with a hash
export const comparePassword = async (password: string, hash: string): Promise<boolean> => {
  // Compare the provided password with the stored hash
  return await bcrypt.compare(password, hash);
};
