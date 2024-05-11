const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const getCourses = async (req, res) => {
  try {
    const courses = await prisma.courses.findMany();

    if (!courses || courses.length === 0) {
      return res.status(404).json({ error: "No courses found" });
    }

    return res.json(courses);
  } catch (error) {
    console.error("Error fetching courses:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getCourses };
