const { PrismaClient, Prisma } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getSesions = async (req, res) => {
  const routineID = parseInt(req.params.routineId);
  console.log(routineID);

  try {
    const sessions = await prisma.practice_sessions.findMany({
      where: {
        RoutineID: routineID,
      },
    });

    res.status(200).json(sessions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
