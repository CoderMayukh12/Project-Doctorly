// const express = require("express");
// const router = express.Router();
// const multer = require("multer");
// const { uploadReports } = require("../controllers/uploadController");

// // Configure multer storage
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // files will be stored in the 'uploads' folder
//   },
//   filename: (req, file, cb) => {
//     // Save the file with original name. You can modify to avoid name collisions.
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });

// // POST /api/upload
// router.post("/upload", upload.array("reports", 5), uploadReports);

// module.exports = router;
const express = require("express");
const multer = require("multer");
const path = require("path");
const Report = require("../models/Report");

const router = express.Router();

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Uploads stored in backend/uploads folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

// File filter to allow only PDFs
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDFs are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// API endpoint to handle file uploads
router.post("/", upload.array("reports", 3), async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    // Store report details in MongoDB
    const reports = req.files.map((file) => ({
      userId: req.body.userId, // Attach user ID to reports
      filename: file.filename,
      filePath: file.path,
      uploadDate: new Date(),
    }));

    await Report.insertMany(reports);
    res.json({ message: "Files uploaded successfully", reports });
  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "File upload failed" });
  }
});

module.exports = router;
