const express = require("express");
const routes = express.Router();
const LoginController = require("../controller/logincontroller");
const ValidateLogin = require("../middleware/ValidateLogin");

routes.post("/Login", ValidateLogin(), LoginController.loginUser);

module.exports = routes;
