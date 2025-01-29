import { createUser, findUserByEmail } from '../services/userService.js';
import { generateToken } from '../utils/auth.js';

export const register = async (req, res) => {
  try {
    const user = await createUser(req.body);
    res.status(201).json({
      userId: user.userId,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await findUserByEmail(email);

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user);
    res.json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};