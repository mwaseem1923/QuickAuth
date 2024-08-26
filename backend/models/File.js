// backend/models/File.js
const mongoose = require('mongoose');

const FileSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    path: { type: String, required: true },
    originalName: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('File', FileSchema);
