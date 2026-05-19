const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  googleId: { type: String },
  githubId: { type: String },
  role: { 
    type: String, 
    enum: ['employee', 'manager', 'admin'], 
    default: 'employee' 
  },
  department: { type: String, default: 'General' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
