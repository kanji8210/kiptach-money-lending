// controllers/registerController.js
const bcrypt = require('bcrypt');
const User = require('../models/User');

exports.register = async (req, res) => {
  const { fullName, email, phone, county, residentialAddress, refereesID, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      phone,
      county,
      residentialAddress,
      refereesID,
      password: hashedPassword,
    });

    res.status(201).json({ message: 'Registration successful', user });
  } catch (error) {
    res.status(400).json({ error: 'Registration failed', details: error.message });
  }
};
