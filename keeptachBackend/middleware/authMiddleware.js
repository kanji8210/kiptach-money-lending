import jwt from 'jsonwebtoken';
import { findUserById } from '../services/Userservice';

export const authenticate = async (req, res, next) => {
  try {
    // Extract token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.userId) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    // Find user by ID
    const user = await findUserById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    console.error('Authentication error:', error);

    // Handle specific JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }

    // Generic error
    res.status(500).json({ error: 'Internal Server Error' });
  }
};