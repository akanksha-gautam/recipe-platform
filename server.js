const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
const connectDB = async () => {
  if (process.env.NODE_ENV === 'test') {
    try {
      const { MongoMemoryServer } = require('mongodb-memory-server');
      const mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();
      await mongoose.connect(uri);
      console.log('Connected to In-Memory MongoDB database successfully.');
      app.locals.mongoServer = mongoServer;
    } catch (err) {
      console.error('Failed to start in-memory MongoDB:', err.message);
      process.exit(1);
    }
  } else {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      console.error('CRITICAL ERROR: MONGODB_URI is not defined in the environment variables.');
      process.exit(1);
    }
    try {
      await mongoose.connect(MONGODB_URI);
      console.log('Connected to MongoDB database successfully.');
    } catch (err) {
      console.error('MongoDB connection error:', err.message);
      process.exit(1);
    }
  }
};

connectDB();

// Welcome / Healthcheck Route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'Welcome to the Recipe Sharing Platform API',
    endpoints: {
      auth: '/api/auth',
      recipes: '/api/recipes',
    },
  });
});

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/recipes', require('./routes/recipes'));

const auth = require('./middleware/auth');
const User = require('./models/User');
app.get('/api/favourites', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user).populate({
      path: 'favourites',
      populate: {
        path: 'author',
        select: 'name email',
      },
    });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user.favourites.filter(Boolean));
  } catch (err) {
    console.error('Get favourites error:', err.message);
    res.status(500).send('Server error');
  }
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'An internal server error occurred',
    error: process.env.NODE_ENV === 'production' ? {} : err.message,
  });
});

// Port configuration
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
