const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.addRoutine = async (req, res) => {
  const { name, aim } = req.body;
  const userId = req.userId; // Get user ID from the decoded token

  try {
    // Create the routine using Prisma client, associating it with the user ID
    const newRoutine = await prisma.practice_routines.create({
      data: {
        name,
        aim,
        user: userId, // Associate the routine with the user ID
      },
    });

    console.log("Routine added successfully");
    res
      .status(200)
      .json({ message: "Routine adding successful", routine: newRoutine });
  } catch (error) {
    console.error("Error adding routine:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
