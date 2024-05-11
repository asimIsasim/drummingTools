const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { check, validationResult } = require("express-validator");
const morgan = require("morgan");
//const db = require("./Connect/db");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
const { verifyToken } = require("./middleware/verfiyToken");

app.use(UserSignup);

app.post("/api/khalti", async (req, res) => {
  const data = {
    return_url: "http://localhost:5173/",
    website_url: "http://localhost:5173/",
    amount: 1000,
    purchase_order_id: 1,
    purchase_order_name: "Membership Payment",
    customer_info: {
      name: "User",
      email: "user@gmail.com",
    },
  };

  try {
    const response = await axios({
      method: "post",
      url: "https://a.khalti.com/api/v2/epayment/initiate/",
      data: data,
      headers: {
        Authorization: "key a231f6494d1343f8a46ebe3e9fbb8def",
        "Content-Type": "application/json",
      },
    });

    res.json({ data: response.data });
  } catch (error) {
    console.error("Error from Khalti API", error.response.data);
    res.status(500).json({ message: "Payment failed", error: error.message });
  }
});

app.put("/membership", async (req, res) => {
  const userId = parseInt(req.body.userId);

  console.log("User ID", userId);

  try {
    const user = await prisma.users.update({
      where: { user_id: userId },
      data: { isMember: true },
    });
    console.log(user);
  } catch (error) {
    console.error("Error updating user membership", error);
    res.status(500).json({ message: "Error updating user membership" });
  }
});

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
