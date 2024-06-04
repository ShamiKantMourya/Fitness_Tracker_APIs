const fs = require("fs");
const mongoose = require("mongoose");

const Exercise = require("../models/exercise");
const jsonData = fs.readFileSync("./data/exercise.json");
const exerciseData = JSON.parse(jsonData);

const seedDataBasetoExercise = async () => {
  try {
    for (const exercise of exerciseData) {
      const newExercise = new Exercise(exercise);
      await newExercise.save();
      console.log(`${newExercise.exerciseName} exercise seeded`);
    }
  } catch (err) {
    console.error("Error seeding income database:", err);
  } finally {
    mongoose.disconnect();
  }
};
// seedDataBasetoExercise();

//Get all exercise
exports.getAllExercise = async (req, res) => {
  try {
    const exercise = await Exercise.find({});
    res.status(200).json({
      success: true,
      data: exercise,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting all exercises",
    });
  }
};

//Add new exercise
exports.addNewExercise = async (req, res) => {
  try {
    const exercise = req.body;
    const newExercise = new Exercise(exercise);
    const savedExercise = await newExercise.save();
    res.status(201).json({
      success: true,
      data: savedExercise,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding new exercise",
    });
  }
};

//Delete exercise by id
exports.deleteExerciseById = async (req, res) => {
  try {
    const exerciseId = req.params.exerciseId;
    const deletedExercise = await Exercise.findByIdAndDelete(exerciseId);
    res.status(200).json({
      success: true,
      data: deletedExercise,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting exercise",
    });
  }
};
