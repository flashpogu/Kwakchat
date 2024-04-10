import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { generateTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  const { fullName, username, password, confirmPassword, gender } = req.body;
  if (
    !username ||
    !password ||
    !fullName ||
    !gender ||
    !confirmPassword ||
    gender === "" ||
    confirmPassword === "" ||
    fullName === "" ||
    username === "" ||
    password === ""
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Password dont't match" });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // HASH THE PASSWORD
    const hashedPassword = bcryptjs.hashSync(password, 10);

    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });

    if (newUser) {
      await newUser.save();

      // Generate JWT token here
      generateTokenAndSetCookie(newUser._id, res);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in signup", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password || username === "" || password === "") {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    const validPassword = bcryptjs.compareSync(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid username or password" });
    }
    // Generate JWT token here
    generateTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in logout", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const google = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });
      const { password: hashedPassword, ...rest } = user._doc;
      res.cookie("jwt", token, { httpOnly: true }).status(200).json(rest);
    } else {
      const generatedPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        email: req.body.email,
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 1000).toString(),
        password: hashedPassword,
        fullName: req.body.name,
        profilePic: req.body.photo,
        gender: req.body.gender,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "15d",
      });
      const { password: hashedPassword2, ...rest } = newUser._doc;
      res
        .cookie("jwt", token, {
          httpOnly: true,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.log("Error in login with google", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
