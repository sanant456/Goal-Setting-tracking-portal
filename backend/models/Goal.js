const mongoose = require('mongoose');

const GoalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  progress: { type: Number, default: 0, min: 0, max: 100 },
  status: { 
    type: String, 
    enum: ['on track', 'at risk', 'completed'], 
    default: 'on track' 
  },
  dueDate: { type: Date, required: true },
  assignee: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Goal', GoalSchema);
