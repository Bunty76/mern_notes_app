import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

//handle register user
export const handleRegister = async (req, res) => {
  //1 take input from body
  const { username, email, password } = req.body;
  try {
    //2 check all fields are present
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }
    //3 check user exist or not
    const user = await userModel.findOne({ email });
    //4 if user not exist then return error
    if (user) {
      return res.status(400).json({
        message: "User already exist",
      });
    }
    //5 if user not exist then create user
    const newUser = await userModel.create({ username, email, password });
    
    //6 generate JWT token
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SCRETE_KEY, {
      expiresIn: "1h",
    });
    
    //7 return token in response (and also set cookie for consistency with login)
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1 * 60 * 60 * 1000, // 1 hour in milliseconds
    });
    
    res.status(201).json({
      message: "User registered successfully",
      token: token,
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error in register process",
    });
    console.log("er", error);
  }
};

//handle login user
export const handleLogin = async (req, res) => {
  //1 take input from body
  const { email, password } = req.body;
  try {
    //2 check all fields are present
    if (!email || !password)
      return res.status(400).json({
        message: "Email and password are required",
      });
    //3 check user exist or not
    const userExist = await userModel.findOne({ email });
    //4 if user not exit then return error
    if (!userExist)
      return res.status(400).json({
        massage: "User not exist or password is incorrect",
      });
    //5 if user exist then check password
    const ismatch = await bcryptjs.compare(password, userExist.password);
    //6 if password is incorrect then return error
    if (!ismatch)
      return res.status(400).json({
        massage: "User not exist or password is incorrect",
      });
    //7 password is correct asign token
    const token = jwt.sign({ id: userExist._id }, process.env.JWT_SCRETE_KEY, {
      expiresIn: "1h",
    });
    //8 return token through cookies in httponly
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 1 * 60 * 60 * 1000, // 1 hour in milliseconds
    });
    //9 return success message and token in response body
    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: userExist._id,
        username: userExist.username,
        email: userExist.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      massage: "Server error in login",
    });
    console.log("err in login", error);
  }
};

//handle logout user
export const handleLogout = (req, res) => {
  //1 clear token from cookies
  res.clearCookie("token");
  //2 return success message
  res.status(200).json({ message: "Logout successful" });
};
