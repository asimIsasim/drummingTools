const jwt = require("jsonwebtoken");
const secretKey =
  "T3Hn1FyTj0XwU9Qz5LvPdRgHbYq1eKt5MwSvVvJyZb8Cw8Ml1NcVeXeMfPhRj6Kp";

exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token || !token.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ error: "Unauthorized: Missing or invalid token" });
  }

  // Extract the token string without the "Bearer " prefix
  const tokenString = token.slice(7);

  try {
    // Verify token and decode payload
    const decoded = jwt.verify(tokenString, secretKey);

    // Extract userId from decoded payload
    const userId = decoded.userId;

    if (!userId) {
      throw new Error("User ID not found in token payload");
    }

    // Attach userId to request object for further middleware or route handling
    req.userId = userId;

    //console.log("User ID extracted from token:", req.userId);

    next();
  } catch (error) {
    // Handle token decoding errors
    console.error("Error decoding token:", error.message);
    return res.status(403).json({ error: "Unauthorized: Invalid token" });
  }
};
