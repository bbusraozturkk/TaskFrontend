const express = require('express');
const path = require('path'); //Platformdan bağımsız dosya yolu oluşturmak için.
const multer = require('multer');
const router = express.Router(); //Alt routeları tanımlamak için kullanılır.
const upload = multer({ dest: 'uploads/' }); //Dosya yükleme işlemlerini yönetmek için kullanılan middleware.

//documentController.js fonksiyonlarının importları
const {
  createDocument,
  getDocuments,
  getDocumentById
} = require('../controllers/documentController');

router.post('/', upload.single('file'), createDocument);  //Yeni Döküman Ekleme formunun hedefi
router.get('/', getDocuments); //dökümanları listeler
router.get('/:id', getDocumentById); //Idye göre dökümanın detay bilgilerini ve revizyon geçmişini döner.

//indirme işlemi
router.get('/download/:filename', (req, res) => {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, '..', 'uploads', fileName);

  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error('Dosya indirilemedi:', err);
      res.status(404).send('Dosya bulunamadı.');
    }
  });
});

module.exports = router;
