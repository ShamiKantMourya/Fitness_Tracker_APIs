const express = require("express");

const {
  getAllExercise,
  addNewExercise,
  deleteExerciseById
} = require("../controller/exercise.controller");

const router = express.Router();

//Get all exercise
router.route("/").get(getAllExercise);

//Add new exercises
router.route("/").post(addNewExercise);

//Delete exercise by id
router.route("/:exerciseId").delete(deleteExerciseById);

module.exports = router;
