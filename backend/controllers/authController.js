const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "User already exists." });
    }

    // Create a new user
    user = new User({ email, password });
    await user.save();

    // In production, send a verification email here

    res
      .status(201)
      .json({
        message: "User registered successfully. Please verify your email.",
      });
  } catch (err) {
    console.error("SignUp error: ", err);
    res.status(500).json({ error: "Server error." });
  }
};

exports.signIn = async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials." });
    }

    // Generate JWT with payload (expires in 1 hour)
    const payload = { userId: user._id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ message: "Sign in successful.", token, userId: user._id });
  } catch (err) {
    console.error("SignIn error: ", err);
    res.status(500).json({ error: "Server error." });
  }
};
