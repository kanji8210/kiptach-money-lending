import express from 'express';
import cors from 'cors';
import os from 'os';
import sequelize from './config/database.js';
import authRoutes from './routes/authRoutes.js';
import creditRoutes from './routes/creditRoutes.js';

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/credits', creditRoutes);

// Function to get local IP address
const getLocalIP = () => {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return 'localhost';
};

// Database sync and server start
const startServer = async () => {
  try {
    const isConnected = await sequelize.authenticate();
    
    if (isConnected) {
      console.log('✅ Database connection successful');
      
      // Sync all models
      await sequelize.sync({ alter: true });
      console.log('🔄 Database synced');

      const localIP = getLocalIP();
      app.listen(PORT, localIP, () => {
        console.log(`🚀 Server running on http://${localIP}:${PORT}`);
        console.log(`🌐 Accessible from other devices on your network`);
      });
    }
  } catch (error) {
    console.error('❌ Server startup failed:', error);
    process.exit(1);
  }
};

// Start the application
startServer();

// Basic test route
app.get('/', (req, res) => {
  res.send('KeepTach Backend Operational');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});