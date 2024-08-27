const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');

const app = express();

connectDB();

// Middleware
app.use(express.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/dashboard', fileRoutes);

module.exports = app;