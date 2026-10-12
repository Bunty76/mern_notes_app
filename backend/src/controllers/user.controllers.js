import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//handle register user
export const handleRegister = async (req, res) => {
  try {
    const { username, email, password } = req.body || {};

    // 1. Check all required fields are present
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields (username, email, password) are required",
      });
    }

    const trimmedUsername = typeof username === "string" ? username.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    if (!trimmedUsername || !trimmedEmail || typeof password !== "string") {
      return res.status(400).json({
        message: "Invalid input provided. Fields cannot be empty.",
      });
    }

    // 2. Validate field formats and lengths
    if (trimmedUsername.length < 3 || trimmedUsername.length > 30) {
      return res.status(400).json({
        message: "Username must be between 3 and 30 characters long",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmedEmail)) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters long",
      });
    }

    // 3. Check if user with same email or username already exists
    const existingUser = await userModel.findOne({
      $or: [{ email: trimmedEmail }, { username: trimmedUsername }],
    });

    if (existingUser) {
      if (existingUser.email.toLowerCase() === trimmedEmail) {
        return res.status(400).json({
          message: "Email is already registered",
        });
      }
      if (existingUser.username.toLowerCase() === trimmedUsername.toLowerCase()) {
        return res.status(400).json({
          message: "Username is already taken",
        });
      }
    }

    // 4. Create user
    const newUser = await userModel.create({
      username: trimmedUsername,
      email: trimmedEmail,
      password,
    });

    // 5. Generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    });

    // 6. Set cookie
    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error in handleRegister:", error);

    // Handle Mongoose validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((val) => val.message);
      return res.status(400).json({
        message: messages.join(", "),
      });
    }

    // Handle MongoDB duplicate key error (code 11000)
    if (error.code === 11000) {
      const duplicateField = Object.keys(error.keyPattern || {})[0] || "field";
      return res.status(400).json({
        message: `${
          duplicateField.charAt(0).toUpperCase() + duplicateField.slice(1)
        } already exists`,
      });
    }

    return res.status(500).json({
      message: "Server error during registration process",
    });
  }
};

//handle login user
export const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body || {};

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const trimmedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";

    // Find user by normalized email
    const userExist = await userModel.findOne({ email: trimmedEmail });
    if (!userExist) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isMatch = await bcryptjs.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid email or password",
      });
    }

    // Sign token
    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRE || "7d",
    });

    const isProduction = process.env.NODE_ENV === "production";
    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: userExist._id,
        username: userExist.username,
        email: userExist.email,
      },
    });
  } catch (error) {
    console.error("Error in handleLogin:", error);
    return res.status(500).json({
      message: "Server error during login",
    });
  }
};

//handle logout user
export const handleLogout = (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  res.clearCookie("token", {
    httpOnly: true,
    secure: isProduction,
    sameSite: isProduction ? "none" : "lax",
  });
  return res.status(200).json({ message: "Logout successful" });
};
