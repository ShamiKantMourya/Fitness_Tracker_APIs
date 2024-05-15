const express = require("express");

const {
  getAllGoal,
  addNewGoal,
  deleteGoalById,
} = require("../controller/goal.controller");

const router = express.Router();

//Get all goal
router.route("/").get(getAllGoal);

//Add new goal
router.route("/").post(addNewGoal);

//Delete goal by id
router.route("/:goalId").delete(deleteGoalById);

module.exports = router;
