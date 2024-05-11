const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getProfile = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await prisma.users.findUnique({
      where: {
        user_id: userId,
      },
    });
    //console.log(user);
    res
      .status(200)
      .json({ message: "User profile retrieved successfully", user });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
