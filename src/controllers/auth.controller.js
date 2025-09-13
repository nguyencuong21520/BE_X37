import { UserModel } from "../models/index.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcrypt";

const register = async (req, res) => {
  const { name, email, password, phone } = req.body;

  console.log("🚀 ~ register ~ name:", req.user);

  const checkExistingUser = await UserModel.findOne({ email });

  if (checkExistingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  //hashing password
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  const newUser = await UserModel.create({
    name,
    email,
    password: hashedPassword,
    phone,
    role: "user",
  });

  return res
    .status(201)
    .json({ message: "User created successfully", user: newUser });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid password" });
  }

  // generate a token
  const userData = {
    id: user._id,
  };
  const token = jwt.sign(userData, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  // Login successful
  return res.status(200).json({
    message: "Login successful",
    user: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

const getCurrentUser = async (req, res) => {
  try {
    const user = req.user;

    return res.status(200).json({
      success: true,
      message: "Lấy thông tin user thành công",
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Lỗi server khi lấy thông tin user",
      error: error.message,
    });
  }
};

export { register, login, getCurrentUser };
