import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, getUserByEmail } from '../models/User.js';

const secretKey = 'Kamelilo';

export const registerUser = async (userData) => {
  const { fullName, email, phone, county, residentialAddress, refereesID, password } = userData;

  // Check if user already exists
  const existingUser = await getUserByEmail(email);
  if (existingUser) {
    throw new Error('User already exists');
  }

  // Hash the password
  const passwordHash = await bcrypt.hash(password, 10);

  // Create the user
  const newUser = await createUser({
    fullName,
    email,
    phone,
    county,
    residentialAddress,
    refereesID,
    passwordHash,
  });

  // Generate JWT token
  const token = jwt.sign({ id: newUser.id, email: newUser.email }, secretKey, { expiresIn: '1h' });

  return { user: newUser, token };
};
