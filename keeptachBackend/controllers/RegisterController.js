// controllers/RegisterController.js
exports.register = async (req, res) => {
  try {
    console.log('Registration request:', req.body);
    // Your registration logic
    res.status(200).json({ message: 'Registration successful' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
};