import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message:
          "Authentication required. Please login to access this resource.",
      });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SCRETE_KEY);

    // Attach user info to request object
    req.userId = decoded.id;

    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token. Please login again.",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired. Please login again.",
      });
    }
    res.status(500).json({
      message: "Server error in authentication",
    });
  }
};
