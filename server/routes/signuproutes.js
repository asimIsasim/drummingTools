const express = require("express");
const routes = express.Router();
const UserAdder = require("../controller/signupController");
const ValidateUser = require("../middleware/ValidateSignup");

routes.post("/signup", ValidateUser(), UserAdder.addUser);

module.exports = routes;
