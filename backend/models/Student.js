const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  department: { type: String, required: true },
  year: { type: Number, required: true },
  cgpa: { type: Number, required: true },
  skills: [String],
  resume: { type: String },
  placed: { type: Boolean, default: false },
  placedCompany: { type: String, default: null },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Student', studentSchema);