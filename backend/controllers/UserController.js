import { registerUser } from '../services/UserService';

export const register = async (req, res) => {
  try {
    const userData = req.body;
    const { user, token } = await registerUser(userData);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
