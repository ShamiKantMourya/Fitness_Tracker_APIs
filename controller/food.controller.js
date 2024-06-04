const mongoose = require("mongoose");
const fs = require("fs");

const Food = require("../models/food");
const jsonData = fs.readFileSync("./data/food.json");
const foodData = JSON.parse(jsonData);

const seedDataBaseToFood = async () => {
  try {
    for (const food of foodData) {
      const newFood = new Food(food);
      await newFood.save();
      console.log(`${newFood.foodName} food seeded`);
    }
  } catch (err) {
    console.error("Error seeding income database:", error);
  } finally {
    mongoose.disconnect();
  }
};
// seedDataBaseToFood();

// Get all food
exports.getAllFood = async (req, res) => {
  try {
    const food = await Food.find({});
    res.status(200).json({
      success: true,
      data: food,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting all food",
    });
  }
};

//Add new food
exports.addNewFood = async (req, res) => {
  try {
    const food = req.body;
    const newFood = new Food(food);
    const savedFood = await newFood.save();
    res.status(201).json({
      success: true,
      data: savedFood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while adding new food",
    });
  }
};

//Delete food by id
exports.deleteFoodById = async (req, res) => {
  try {
    const foodId = req.params.foodId;
    const deletedFood = await Food.findByIdAndDelete(foodId);
    res.status(200).json({
      success: true,
      data: deletedFood,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while deleting food",
    });
  }
};
