const express = require('express');
const router = express.Router();
const multer = require('multer');
const { addRevision } = require('../controllers/revisionController');

//dosyalar uploads klasörüne kaydedilir.
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + '-' + file.originalname;
    cb(null, uniqueName);
  }
});

//Dosya kontrolleri
const upload = multer({
  storage,
  limits: { fileSize: 100 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['application/pdf', 'application/zip', 'application/x-zip-compressed', 'application/octet-stream', 'image/vnd.dwg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Sadece .pdf, .zip ve .dwg dosyaları yüklenebilir'));
    }
  }
});

router.post('/:id/revision', upload.single('file'), addRevision); // bir dökümanın revizyonunu ekler

module.exports = router;
