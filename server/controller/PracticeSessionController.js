const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.addSession = async (req, res) => {
  try {
    const routineId = req.params.routineId; // get routineId from URL parameters
    const { description } = req.body; // assuming description is sent in the request body
    if (!req.file) {
      return res.status(400).json({ error: "File is required" });
    }

    const filePath = req.file.path;

    // Insert session into database
    const session = await prisma.practice_sessions.create({
      data: {
        filepath: filePath,
        RoutineID: parseInt(routineId, 10),
        description: description, // add description to the session
      },
    });

    res.status(200).json({ message: "Session added successfully", session });
  } catch (error) {
    console.error("Error adding session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
