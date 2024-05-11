const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.addCourse = async (req, res) => {
  console.log(req.body);
  const { name } = req.body;

  try {
    // Create the course using Prisma client
    const newCourse = await prisma.courses.create({
      data: {
        name,
      },
    });

    console.log("Course added successfully");
    res
      .status(200)
      .json({ message: "Course adding successful", course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
