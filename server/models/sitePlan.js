const mongoose = require('mongoose');

const sitePlanSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  fileKey: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
  uploadedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
}, {
  timestamps: true,
});

const SitePlan = mongoose.model('SitePlan', sitePlanSchema);

module.exports = SitePlan;