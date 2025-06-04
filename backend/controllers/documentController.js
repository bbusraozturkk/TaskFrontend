const Document = require('../models/Document');
const Revision = require('../models/Revision');

//Yeni döküman eklediğim alan
const createDocument = async (req, res) => {
  try {
    const {
      projectCode,
      type,
      documentNo,
      title,
      contractDate,
      status,
      approvalStatus,
      description,
      createdBy
    } = req.body;
//Frontend'den gelen döküman bilgilerini bodyden alıyorum.
    const document = new Document({
      projectCode,
      type,
      documentNo,
      title,
      contractDate,
      status,
      approvalStatus,
      description,
      createdBy
    });
//Yeni bir Document nesnesi oluşturduğum ve veritabanına kaydettiğim alan.
    const savedDocument = await document.save();
    res.status(201).json(savedDocument);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Döküman oluşturulurken hata oluştu.' });
  }
};
//UI'dan gelen filtrelere göre listeleme yaptığım alan
const getDocuments = async (req, res) => {
  try {
    const filters = {};

    if (req.query.projectCode) filters.projectCode = req.query.projectCode;
    if (req.query.type) filters.type = req.query.type;
    if (req.query.status) filters.status = req.query.status;

    const documents = await Document.find(filters).sort({ createdAt: -1 });

    const enrichedDocuments = await Promise.all(
      documents.map(async doc => {
        const latestRevision = await Revision.findOne({ documentId: doc._id }).sort({ uploadedAt: -1 });
        return {
          ...doc.toObject(),
          latestRevisionId: latestRevision ? latestRevision._id : null
        };
      })
    );

    res.status(200).json(enrichedDocuments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Dökümanlar alınırken hata oluştu.' });
  }
};
//Idye göre döküman detaylarını ve revizyonları getirdiğim alan.
const getDocumentById = async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    if (!document) return res.status(404).json({ error: 'Döküman bulunamadı.' });

    const revisions = await Revision.find({ documentId: req.params.id }).sort({ uploadedAt: -1 });

    res.status(200).json({
      document,
      revisions
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Detay getirilirken hata oluştu.' });
  }
};

module.exports = {
  createDocument,
  getDocuments,
  getDocumentById
};
