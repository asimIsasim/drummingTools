const express = require("express");
const routes = express.Router();
const RoutineAdder = require("../controller/PracticeRoutineController");
const getRoutines = require("../controller/getPracticeRoutine");
const token = require("../middleware/verfiyToken");

routes.post("/addRoutine", token.verifyToken, RoutineAdder.addRoutine);
routes.get("/getRoutines", token.verifyToken, getRoutines.getPracticeRoutines);
module.exports = routes;
