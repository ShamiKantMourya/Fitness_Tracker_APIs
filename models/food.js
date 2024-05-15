const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
  foodName: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
  },
  calories: {
    type: Number,
    required: true,
  },
  proteins: {
    type: Number,
    required: true,
  },
  carbohydrates: {
    type: Number,
    required: true,
  },
  fats: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food;
