const express = require("express");

const {
  getAllFood,
  addNewFood,
  deleteFoodById,
} = require("../controller/food.controller");

const router = express.Router();

//Get all food
router.route("/").get(getAllFood);

//Add new food
router.route("/").post(addNewFood);

//Delete food by id
router.route("/:foodId").delete(deleteFoodById);

module.exports = router;
