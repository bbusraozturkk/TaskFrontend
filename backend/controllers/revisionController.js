const Revision = require('../models/Revision');
const Document = require('../models/Document');
const path = require('path'); // // Dosya yolunu oluşturmak için kullanılıyor.

const addRevision = async (req, res) => {
  try {
    const { notes, uploadedBy } = req.body;
    const documentId = req.params.id; //Revizyon hangi dökümana ait olacaksa onun Idsini url parametresinden alıyor

    if (!req.file) {
      return res.status(400).json({ error: 'Dosya yüklenmedi.' });
    }

    const filePath = path.join('uploads', req.file.filename); //Dosya başarıyla geldiyse uploads klasörüne kaydedilen dosyanın yolunu belirliyor.

    //İlgili dökümana ait en son revizyonu bulur. Eğer varsa numarasını 1 artırır. Yoksa bu ilk revizyondur.
    const lastRevision = await Revision.find({ documentId }).sort({ revisionNo: -1 }).limit(1);
    const revisionNo = lastRevision.length > 0 ? lastRevision[0].revisionNo + 1 : 1;

    //Yeni revizyon nesnesi oluşturup veritabanına kaydettiğim alan
    const revision = new Revision({
      documentId,
      revisionNo,
      filePath,
      notes,
      uploadedBy
    });

    const saved = await revision.save();

    //Document tablosundaki currentRevision alanının ve updatedAt değerinin güncellendiği yer.
    await Document.findByIdAndUpdate(documentId, {
      currentRevision: revisionNo,
      updatedAt: new Date()
    });

    res.status(201).json(saved);
  } catch (error) {
    console.error('Revizyon ekleme hatası:', error);
    res.status(500).json({ error: 'Revizyon eklenirken hata oluştu.' });
  }
};

module.exports = {
  addRevision
};
