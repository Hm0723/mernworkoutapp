// Entry file for the backend app
// where we register the express app

// dovenv is the package that loads environment variables
// from .env file into process.env object available globally in node.js environment
// config() attaches environment variables to process.env
require("dotenv").config();

// Require express that installed via npm
const express = require("express");
// Require mongoose that installed via npm
const mongoose = require("mongoose");
// Require routes
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user");

// Set up the express app
const app = express();

//Require cors
const cors = require("cors");
//Allow requests from all origins (for development only)
app.use(cors());

// Middleware:
// any code that executes between us getting a request on the server
// and us sending a response back to the client

// Parse and attach data sent to server to request object
app.use(express.json());

// Global middleware
// the arrow function will fire for each request that comes in
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
// workoutRoutes is triggered when we make a request to /api/workouts
app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);

// Connect to DB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // Listen for requests
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB & listening on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });

  // Default route for the root URL
app.get("/", (req, res) => {
  res.send("MERN Workout API is running...");
});