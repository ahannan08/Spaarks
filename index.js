import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoutes from './Routes/authRoutes.js';
import restaurantRoutes from './Routes/restRoutes.js';
import cors from 'cors';


// Load environment variables
dotenv.config();

// Initialize 
const app = express();

// Middleware to parse JSON requests
app.use(cors());

app.use(express.json());


// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up routes
app.use('/api/auth', authRoutes);
app.use('/api', restaurantRoutes);

// basic route for testing
app.get('/', (req, res) => {
  res.send('Welcome to the Restaurant API');
});

// Start the server on the specified port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
