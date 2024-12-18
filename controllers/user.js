import { compare, hash } from "bcrypt";
import User from "../models/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const newUser = async (req, res) => {
  const { _id, name, email, password } = req.body;
  if (!_id || !name || !email || !password)
    return res.status(400).json({
      success: false,
      message: "Please fill all the datils",
    });

  const exist = await User.exists({
    $or: [{ _id }, { email }],
  });

  if (exist)
    return res.status(400).json({
      success: false,
      message: "User already exists with same email or id",
    });

  const hashedpass = await hash(password, 10);
  await User.create({
    _id,
    name,
    email,
    password: hashedpass,
  });

  res.status(201).json({
    successs: true,
    message: "User Created succesfully",
  });
};

export const login = async (req, res) => {
  const { _id, password } = req.body;
  if (!_id || !password)
    return res.status(400).json({
      success: false,
      message: "Please fill all the details",
    });

  const user = await User.findById(_id);

  if (!user)
    return res.status(400).json({
      success: false,
      message: "Wrong id or paasword",
    });

  const isSame = await compare(password, user.password);

  if (!isSame)
    return res.status(403).json({
      success: false,
      message: "Wrong id or paasword",
    });

  const secret_key = process.env.SECRET_KEY;
  const token = jwt.sign({ _id: _id }, secret_key);

  res.cookie("credential", token, {
    httpOnly: true,
    max_age: 1000 * 60 * 20,
  });

  res.status(200).json({
    success: true,
    message: "Login Successful",
  });
};

export const userinfo = async (req, res) => {
  const id = req.id;

  const user = await User.findById(id);

  res.status(200).json({
    success: true,
    message: user,
  });
};

export const logout = (req, res) => {
  res.clearCookie("credential", { httpOnly: true });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};

export const editInfo = async (req, res) => {
  const { email, name, password } = req.body;
  const id = req.id;

  const user = await User.findById(id);

  if (email) {
    const exist = await User.exists({ email });
    if (exist)
      return res.status(400).json({
        success: false,
        message: "User exists with same email or ",
      });
  }

  user.name = name || user.name;
  user.email = email || user.email;
  if (password) {
    const hashpasss = await hash(password, 10);
    user.password = hashpasss;
  }

  user.save();

  res.status(200).json({
    success: true,
    message: "Profile Updated",
  });
};
