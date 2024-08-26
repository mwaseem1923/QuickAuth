// backend/routes/auth.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
    res.json({ token, user: { email: user.email } });
});

router.post('/signup', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.create({ email, password });
        res.status(201).json({ message: 'User created', user });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
