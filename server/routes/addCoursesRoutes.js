const express = require("express");
const routes = express.Router();
const CourseAdder = require("../controller/addCourses");
const CoursesGetter = require("../controller/getCourses");

routes.post("/addCourses", CourseAdder.addCourse);
routes.get("/getCourses", CoursesGetter.getCourses);
module.exports = routes;
