const express = require("express");
const cors = require("cors");

const { dataBase } = require("./db/dataBase");
const exercise = require("./routes/exercise");
const goal = require("./routes/goal");
const food = require("./routes/food");

const app = express();

//Middleware
app.use(cors());
app.use(express.json({ extended: true, limit: "50mb" }));

//Database connected
dataBase();

//Routes
app.get("/", (req, res) => {
  res.send("Welcome to fitness tracker!");
});

app.use("/api/v1/exercises", exercise);
app.use("/api/v1/foods", food);
app.use("/api/v1/goals", goal);
        
//Route error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something went wrong!" });
});

//Global error handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
