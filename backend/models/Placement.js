const mongoose = require('mongoose');

const placementSchema = new mongoose.Schema({
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
  recruiter: { type: mongoose.Schema.Types.ObjectId, ref: 'Recruiter', required: true },
  jobTitle: { type: String, required: true },
  package: { type: String, required: true },
  offerDate: { type: Date, default: Date.now },
  status: { type: String, enum: ['Applied', 'Interview', 'Selected', 'Rejected'], default: 'Applied' }
});

module.exports = mongoose.model('Placement', placementSchema);