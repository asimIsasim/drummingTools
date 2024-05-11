const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.addUser = async (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if email is already in use
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return res.status(400).json({ error: "Email is already in use" });
    }

    if (existingUser) {
      console.log("Email alreayd in use");
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user using Prisma client
    const newUser = await prisma.users.create({
      data: {
        name,
        email,
        password: hashedPassword,
        isMember: false,
      },
    });

    console.log("User signed up successfully");
    res.status(200).json({ message: "Signup successful", user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
