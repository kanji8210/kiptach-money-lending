//utils/auth.js
import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  return jwt.sign(
    { userId: user.userId, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};