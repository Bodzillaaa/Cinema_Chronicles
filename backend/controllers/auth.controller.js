import { connectDB } from "../config/db.js";
import bcrypt from "bcryptjs";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

let connection;

export async function signup(req, res) {
  try {
    const { email, fname, lname, password, dob } = req.body;

    if (!email || !fname || !lname || !password || !dob) {
      return res
        .status(400)
        .json({ success: false, msg: "Please enter all fields" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, msg: "Invalid email address" });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        msg: "Password must be at least 6 characters",
      });
    }

    if (!connection) {
      connection = await connectDB();
    }

    const [existingUser] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (existingUser.length > 0) {
      return res
        .status(400)
        .json({ success: false, msg: "User email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const [newUser] = await connection.query(
      "INSERT INTO users (email, first_name, last_name, password, dob) VALUES (?, ?, ?, ?, ?)",
      [email, fname, lname, hashedPassword, dob]
    );

    generateTokenAndSetCookie(newUser._id, res);

    res
      .status(201)
      .json({ success: true, msg: "User registered successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server Error");
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, msg: "Please enter all fields" });
    }

    if (!connection) {
      connection = await connectDB();
    }

    const [user] = await connection.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (user.length === 0) {
      return res
        .status(404)
        .json({ success: false, msg: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user[0].password);

    if (!isMatch) {
      return res
        .status(404)
        .json({ success: false, msg: "Invalid credentials" });
    }

    generateTokenAndSetCookie(user[0].id, res);
    res.status(200).json({ success: true, msg: "Logged in successfully" });
  } catch (error) {
    console.log("Error in login", error.message);
    res.status(500).send("Server Error");
  }
}

export async function logout(req, res) {
  try {
    res.clearCookie("jwt-cinema-chronicles");
    res.status(200).json({ success: true, msg: "Logged out successfully " });
  } catch (error) {
    console.log("Error in logout", error.message);
    res.status(500).send("Server Error");
  }
}
