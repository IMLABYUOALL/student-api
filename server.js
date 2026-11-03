console.log("Starting server...");

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');

const app = express();

app.use(express.json()); 

app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/auth', require('./routes/auth'));

mongoose.connect("mongodb+srv://archiecolinares_db_user:PAKIDIT123@cluster0.vdc7s1m.mongodb.net/studentdb?retryWrites=true&w=majority")
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
  })
  .catch(err => {
    console.error('--- DB CONNECTION ERROR ---');
    console.error(err.message); 
  });