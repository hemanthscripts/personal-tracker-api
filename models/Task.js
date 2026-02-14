const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Links task to a specific user
  title: { type: String, required: true },
  category: { type: String, enum: ['Career', 'Health'], default: 'Career' },
  completed: { type: Boolean, default: false },
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);