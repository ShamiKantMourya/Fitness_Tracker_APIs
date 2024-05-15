const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema(
  {
    exerciseName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    durationInMinutes: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true, 
    toJSON: {
      virtuals: true, 
      transform: function (doc, ret) {
        delete ret._id;
      },
    },
  }
);

const virtualExercise = exerciseSchema.virtual('caloriesBurned');
virtualExercise.get(function () {
  const caloriesPerMinute = {
    running: 10,
    cycling: 8,
    swimming: 12,
    jumpingRope: 12,
    dancing: 5,
    basketball: 8,
    skiing: 9,
    snowboarding: 8,
    rowing: 8,
    soccer: 7,
    tennis: 7,
    boxing: 10,
    hiking: 5,
    aerobics: 7,
    weightlifting: 3,
    sitUps: 6,
    pushUps: 7,
    pilates: 3,
    yoga: 3,
  };

  const exerciseType = this.exerciseName.toLowerCase();

  const caloriesPerMinuteForExercise = caloriesPerMinute[exerciseType] || 1;
  return caloriesPerMinuteForExercise * this.durationInMinutes;
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;
