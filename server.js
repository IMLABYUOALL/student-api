console.log("Starting server...");

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174']
}));
// Routes (Inayos ko na para walang doble)
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);

// Database Connection at Server Start
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => {
    console.error('--- DB CONNECTION ERROR ---');
    console.error(err.message);
  });