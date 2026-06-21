const mongoose = require('mongoose');

const recruiterSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  website: { type: String },
  location: { type: String },
  industry: { type: String },
  description: { type: String },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Recruiter', recruiterSchema);