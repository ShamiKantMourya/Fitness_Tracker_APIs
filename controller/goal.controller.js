const mongoose = require("mongoose");
const fs = require("fs");

const jsonData = fs.readFileSync("./data/goal.json");
const goalData = JSON.parse(jsonData);
const Goal = require("../models/goal");

const seedDataBaseToGoal = async () => {
  try {
    for (const goal of goalData) {
      const newGoal = new Goal(goal);
      await newGoal.save();
      console.log(`${newGoal.goalName} goal seeded`);
    }
  } catch (err) {
    console.error("Error seeding income database:", error);
  } finally {
    mongoose.disconnect();
  }
};
// seedDataBaseToGoal();

//Get all goal
exports.getAllGoal = async (req, res) => {
  try {
    const goal = await Goal.find({});
    if (goal) {
      res.status(200).json({
        success: true,
        data: goal,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No goal found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting all goal",
    });
  }
};

//Add new goal
exports.addNewGoal = async (req, res) => {
  try {
    const goal = req.body;
    const newGoal = new Goal(goal);
    const savedGoal = await newGoal.save();
    res.status(201).json({
      success: true,
      data: savedGoal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding new goal",
    });
  }
};

//Delete goal by id
exports.deleteGoalById = async (req, res) => {
  try {
    const goalId = req.params.goalId;
    const deletedGoal = await Goal.findByIdAndDelete(goalId);
    if (deletedGoal) {
      res.status(200).json({
        success: true,
        data: deletedGoal,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "No goal found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting goal",
    });
  }
};
