const mongoose = require('mongoose'); //MongoDB ile çalışmak için Mongoose kütüphanesini projeye dahil eder.

//Bu alan, her revizyonun hangi dökümana ait olduğunu belirtir.
//ref: 'Document' sayesinde bu alan Document koleksiyonuna referans olur. 1 Document → N Revision ilişkisi.
//Bu sayede bir dökümanın tüm revizyonları populate() ile kolayca çekilebilir.
const RevisionSchema = new mongoose.Schema({
  documentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Document', required: true },
  revisionNo: { type: Number, required: true }, //Her yeni revizyon eklendiğinde bu sayı artar.
  filePath: { type: String, required: true }, //Yüklenen revizyon dosyasının uploads klasöründeki yolu
  uploadedBy: { type: String }, //Revizyonu ekleyen kişinin ismi.
  uploadedAt: { type: Date, default: Date.now }, //Yükleme Tarihi
  notes: { type: String } //Açıklama
});

module.exports = mongoose.model('Revision', RevisionSchema); 
