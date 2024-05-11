const express = require("express");
const { addLesson } = require("../controller/addLesson");
const uploadMiddleware = require("../middleware/upload");
const getLessons = require("../controller/getLessons");

const router = express.Router();

router.post("/addLesson", uploadMiddleware, addLesson);
router.get("/getLessons", getLessons.getLessons);

module.exports = router;
