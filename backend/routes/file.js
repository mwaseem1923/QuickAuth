const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const fileController = require('../controllers/fileController');
const verifyToken = require('../middlewares/verifyToken');

router.use(verifyToken);

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/files', fileController.getFiles);
router.get('/files/:filename', fileController.downloadFile);
router.delete('/files/:filename', fileController.deleteFile);

module.exports = router;
