const Remark = require('../models/Remark');

const addRemark = async (req, res) => {
  console.log('Gelen veri:', req.body);

  try {
    const { revisionId, text, role, createdBy } = req.body; //Frontend'den gelen body verisinden yorumla ilgili bilgiler alınıyor

    const newRemark = new Remark({
      revisionId,
      text,
      role,
      createdBy
    });

    const savedRemark = await newRemark.save();
    res.status(201).json(savedRemark);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Not eklenirken hata oluştu.' });
  }
};

const getRemarksByRevision = async (req, res) => {
  try {
    const { revisionId } = req.params;
    const remarks = await Remark.find({ revisionId }).sort({ createdAt: -1 });
    res.status(200).json(remarks);
  } catch (error) {
    res.status(500).json({ error: 'Notlar alınırken hata oluştu.' });
  }
};

module.exports = {
  addRemark,
  getRemarksByRevision
};
