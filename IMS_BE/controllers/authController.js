import userModel from "../models/userModel";
import bcrypt from "bcryptjs";
const jwt = require("jsonwebtoken");

export const signUP = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    if (!name || !email || !password || !phone) {
      return res.status(400).json({
        message: "Missing Requierd Fields",
        success: false
      });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashPassword,
      phone: phone
    });

    await newUser.save();

    return res.status(200).json({
      message: "User Created Successfully",
      success: true
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
      success: false
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }
    const user = await userModel.find({ email: email });
    if (!user || user.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not registered!"
      });
    }
    const token = jwt.sign(
      { userId: user[0]._id },
      "jdfsahh21378gfeiuihndsfdsf24234jhfdsffds",
      { expiresIn: "1d" }
    );
    if (token)
      return res.status(200).json({
        success: true,
        message: "Login Successful",
        token: token
      });
    else {
      throw new Error("Token generation failed");
    }
  } catch (error) {
    return res.status(500).json({
        message: error.message,
        success: false
    });
  }
};
