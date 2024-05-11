const express = require("express");
const { getProfile } = require("../controller/getProfile");
const token = require("../middleware/verfiyToken");
const router = express.Router();

router.get("/getProfile", token.verifyToken, getProfile);

module.exports = router;
