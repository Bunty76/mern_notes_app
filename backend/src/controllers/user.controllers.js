import userModel from "../models/user.model.js";

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
    await userModel.create({ username, email, password });
    res.status(201).json({
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error in register process",
    });
    console.log("er", error);
  }
};
