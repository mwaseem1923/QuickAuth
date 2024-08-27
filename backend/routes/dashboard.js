const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const upload = require('../middlewares/multer');
const File = require('../models/File');
const router = express.Router();

// Middleware to verify token and attach user
const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).json({ message: 'Invalid token' });
        req.user = decoded;
        next();
    });
};

router.post('/upload', authenticate, upload.single('file'), async (req, res) => {
    try {
        const file = new File({
            filename: req.file.filename,
            path: req.file.path,
            originalName: req.file.originalname,
            user: req.user.id,
        });
        await file.save();
        res.status(201).json({ file });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/files', authenticate, async (req, res) => {
    try {
        const files = await File.find({ user: req.user.id });
        res.json({ files });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

router.get('/files/:filename', authenticate, (req, res) => {
    const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
    res.download(filePath);
});

router.delete('/files/:filename', authenticate, async (req, res) => {
    try {
        const file = await File.findOneAndDelete({ filename: req.params.filename, user: req.user.id });
        if (!file) return res.status(404).json({ message: 'File not found' });
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', req.params.filename));
        res.json({ message: 'File deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
