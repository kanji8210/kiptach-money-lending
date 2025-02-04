import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './config/database.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const HOST = '172.20.10.2';  // Replace with your local IP address

app.use(cors());
app.use(express.json()); // Parse JSON request bodies

// Define API Routes
app.use('/api/auth', authRoutes);

// Start server after DB connection
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    await sequelize.sync();  // Sync database models

    app.listen(PORT, HOST, () => {
      console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
    });
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1); // Exit on failure
  }
};

startServer();
