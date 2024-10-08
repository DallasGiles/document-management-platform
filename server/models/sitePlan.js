import mongoose from 'mongoose';
// TODO: Make sure sitePlanSchema is properly aligned with AWS S3 values
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

export const SitePlan = mongoose.model('SitePlan', sitePlanSchema);