const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema({
  goalName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String
  },
  description: {
    type: String,
    required: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  targetCaloriesValue: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ['In Progress', 'Achieved', 'Abandoned'],
    default: 'In Progress',
  },
});

const Goal = mongoose.model('Goal', goalSchema);

module.exports = Goal;