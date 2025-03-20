const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Import routes
const authRoutes = require("./routes/auth");
const uploadRoutes = require("./routes/upload");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use("/uploads", express.static("uploads")); // Serve static files from the uploads folder

// Routes
app.use("/api", authRoutes);
app.use("/api", uploadRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
