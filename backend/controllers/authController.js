// Dummy in-memory user store. In production, use a database.
let users = [];

exports.signUp = (req, res) => {
  const { email, password } = req.body;
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Check if user exists
  const userExists = users.find((user) => user.email === email);
  if (userExists) {
    return res.status(400).json({ error: "User already exists." });
  }

  // Create new user (add email verification logic as needed)
  const newUser = { email, password };
  users.push(newUser);

  // Respond with success (in a real app, send a verification email)
  res
    .status(201)
    .json({
      message: "User registered successfully. Please verify your email.",
    });
};

exports.signIn = (req, res) => {
  const { email, password } = req.body;
  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  // Verify user credentials
  const user = users.find(
    (user) => user.email === email && user.password === password
  );
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials." });
  }

  // Generate a dummy token (in production, use JWT or similar)
  const token = "dummy-token";

  res.status(200).json({ message: "Sign in successful.", token });
};
