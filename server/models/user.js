const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  // TODO: username should probably be removed as email is used for login. Consider switching to first and last name for use in foreman teams
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['Foreman', 'Basic User'],
    required: true,
  },
  organization: {
    type: String,
    required: true,
  },
  foreman: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);

module.exports = User;