import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { createUser, findUserByEmail, findUserByPhone} from '../services/Userservice.js';

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key'; // Secure key from environment

// Register function
export const register = async (req, res) => {
  try {
    const { fullName, email, phone, county, referralCode, password } = req.body;

    // Log the request body
    console.log('Request body:', req.body);

    // Validate all required fields
    if (!email || !password || !fullName || !phone || !county) {
      console.error('Validation error: All fields are required');
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if the email is already registered
    const existingUserByEmail = await findUserByEmail(email);
    if (existingUserByEmail) {
      console.error('Validation error: Email is already registered');
      return res.status(400).json({ error: 'Email is already registered. Please log in.', loginLink: '/login' });
    }

    // Check if the phone number is already registered
    const existingUserByPhone = await findUserByPhone(phone);
    if (existingUserByPhone) {
      console.error('Validation error: Phone number is already registered');
      return res.status(400).json({ error: 'Phone number is already registered. Please log in.', loginLink: '/login' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user in the database
    const newUser = await createUser({
      fullName,
      email,
      phone,
      county,
      referralCode: referralCode || null,
      password: hashedPassword,
    });

    // Respond with the new user data (you can adjust based on your needs)
    console.log('User registered successfully:', newUser);
    res.status(201).json({ message: 'User registered successfully', user: newUser });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Login function (for completeness)
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email and password
    if (!email || !password) {
      console.error('Validation error: Email and password are required');
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user by email
    const user = await findUserByEmail(email);
    if (!user) {
      console.error('Validation error: Invalid email or password');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.error('Validation error: Invalid email or password');
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.userId, email: user.email },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    console.log('Login successful:', { token, user });
    res.status(200).json({ message: 'Login successful', token, user });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
