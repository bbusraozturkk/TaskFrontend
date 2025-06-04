// projedeki her dökümanın temel bilgilerini tanımladım.

const mongoose = require('mongoose');

const DocumentSchema = new mongoose.Schema({
  projectCode: { type: String, required: true },
  type: { type: String, required: true },
  documentNo: { type: String, required: true },
  title: { type: String, required: true },
  contractDate: { type: Date },
  currentRevision: { type: Number, default: 1 },
  approvalStatus: { type: String, required: true },
  description: { type: String },
  createdBy: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Document', DocumentSchema);

//1 Document → N Revision
//1 Revision → N Remark
