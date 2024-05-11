const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const morgan = require("morgan");
//const db = require("./Connect/db");

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(morgan("dev"));

const UserSignup = require("./routes/signuproutes");
const UserLogin = require("./routes/loginroutes");
const RoutineAdder = require("./routes/routineAdderRoutes");
const SessionAdder = require("./routes/sessionAdderRoutes");
const Courses = require("./routes/addCoursesRoutes");
const Lessos = require("./routes/LessonRoutes");
const profile = require("./routes/userProfileRoutes");
const adminGetRoutes = require("./routes/adminGetRoutes");

app.use(UserSignup);
app.use(UserLogin);
app.use(RoutineAdder);
app.use(SessionAdder);
app.use(Courses);
app.use(Lessos);
app.use(profile);
app.use(adminGetRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
