import UserModel from '../Model/User.model.js';
import mongoose from 'mongoose';
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';

dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET;

// Controller to register a new user
export async function addUser(req, res) {
  const { email, password } = req.body;

  try {
    // Check if a user with the same email already exists
    const existUser = await UserModel.find({ email });

    if (existUser.length > 0) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password using bcrypt
    const hashed = await bcrypt.hash(password, 10);

    // Create a new user document
    const newUser = new UserModel({
      email,
      password: hashed
    });

    // Save the user to the database
    await newUser.save();

    // Respond with success and basic user info (excluding password)
    res.status(201).json({
      message: "User created successfully",
      EmailId: email,
      UserId: newUser._id
    });
  } catch (error) {
    // Catch any server or database error
    res.status(500).json({ message: error.message });
  }
}

// Controller to authenticate a user and return a JWT token
export async function loginUser(req, res) {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await UserModel.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token with a 7-hour expiry
    const token = jwt.sign({ UserId: user._id }, JWT_SECRET, { expiresIn: '7h' });

    // Respond with the token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      UserId: user._id,
      EmailId: user.email
    });
  } catch (error) {
    // Catch any error during authentication
    res.status(500).json({ message: error.message });
  }
}
