const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
 user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  category: { type: String, enum: ['Career', 'Health'], default: 'Career' },
  completed: { type: Boolean, default: false }, // Keep this
  status: { type: String, default: 'In Progress' }, // Add this for your controller 
  deadline: { type: Date }, // Add this for your sorting 
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Task', TaskSchema);