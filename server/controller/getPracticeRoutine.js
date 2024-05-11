const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

// Route to fetch practice routines for the authenticated user
exports.getPracticeRoutines = async (req, res) => {
  const userId = req.userId; // Get user ID from the decoded token
  //console.log(userId);
  try {
    const practiceRoutines = await prisma.practice_routines.findMany({
      where: {
        user: userId, // Fetch routines only for the authenticated user
      },
    });

    if (!practiceRoutines || practiceRoutines.length === 0) {
      return res.status(404).json({ error: "No practice routines found" });
    }

    return res.json(practiceRoutines);
  } catch (error) {
    console.error("Error fetching practice routines:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
