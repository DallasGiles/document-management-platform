const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  organization: String,
  role: { type: String, enum: ['Foreman', 'Basic User'] },
});

module.exports = mongoose.model('User', userSchema);