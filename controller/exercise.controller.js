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
    if (exercise) {
      res.status(200).json({
        success: true,
        data: exercise,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No exercise found",
      });
    }
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
    if (deletedExercise) {
      res.status(200).json({
        success: true,
        data: deletedExercise,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No exercise found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting exercise",
    });
  }
}