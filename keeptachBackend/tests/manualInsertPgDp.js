import User from '../models/User.js';

async function createTestUser() {
  try {
    const newUser = await User.create({
      fullName: 'John Doe',
      email: 'johndoe@example.com',
      phone: '0712345678',
      password: 'securepassword123', // This will be automatically hashed
      county: 'Nairobi',
      role: 'borrower',
    });

    console.log('User created:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  }
}

createTestUser();
