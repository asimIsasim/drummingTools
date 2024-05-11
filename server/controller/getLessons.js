const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getLessons = async (req, res) => {
  const courseId = req.query.courseId;
  try {
    const lessons = await prisma.lesson.findMany({
      where: { course_id: parseInt(courseId) },
    });
    if (!lessons || lessons.length === 0) {
      return res.status(404).json({ error: "No lessons found" });
    }
    return res.json(lessons);
  } catch (error) {
    console.error("Error fetching lessons:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
