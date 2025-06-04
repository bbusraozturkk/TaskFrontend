const mongoose = require('mongoose');

const RemarkSchema = new mongoose.Schema({
  //Bu alan, bu yorumun hangi revizyona ait olduğunu belirtiyor. ref: 'Revision' sayesinde Revision modeline referans oluşturur.
  revisionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Revision', required: true },
  role: { type: String, enum: ['Owner', 'Design', 'Class', 'Flag'], required: true }, //yorumun hangi rol tarafından yapıldığını belirtir.
  text: { type: String, required: true },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Remark', RemarkSchema);

//1 Revision → N Remark ilişkisi 