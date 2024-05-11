const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addLesson = async (req, res) => {
  const { title, description, course_id } = req.body;
  const video = req.file ? req.file.filename : null;

  try {
    // Parse course_id as an integer
    const courseId = parseInt(course_id);

    // Create the lesson using Prisma client
    const newLesson = await prisma.lesson.create({
      data: {
        title,
        description,
        video,
        course_id: courseId, // Use the parsed course_id
      },
    });

    console.log("Lesson added successfully");
    res
      .status(200)
      .json({ message: "Lesson adding successful", lesson: newLesson });
  } catch (error) {
    console.error("Error adding lesson:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
