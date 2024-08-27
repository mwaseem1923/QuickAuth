const fs = require('fs');
const path = require('path');
const File = require('../models/File');

const uploadFile = async (req, res) => {
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
};

const getFiles = async (req, res) => {
    try {
        const files = await File.find({ user: req.user.id });
        res.json({ files });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const downloadFile = (req, res) => {
    const filePath = path.join(__dirname, '..', 'uploads', req.params.filename);
    res.download(filePath);
};

const deleteFile = async (req, res) => {
    try {
        const file = await File.findOneAndDelete({ filename: req.params.filename, user: req.user.id });
        if (!file) return res.status(404).json({ message: 'File not found' });
        fs.unlinkSync(path.join(__dirname, '..', 'uploads', req.params.filename));
        res.json({ message: 'File deleted' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

module.exports = { getFiles, downloadFile, deleteFile, uploadFile };