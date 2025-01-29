import jwt from 'jsonwebtoken';
import { findUserById } from '../services/userService.js';

export const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) throw new Error('Authentication required');

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await findUserById(decoded.userId);

    if (!user) throw new Error('User not found');
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};