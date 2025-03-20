const express = require("express");
const router = express.Router();
const multer = require("multer");
const { uploadReports } = require("../controllers/uploadController");

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // files will be stored in the 'uploads' folder
  },
  filename: (req, file, cb) => {
    // Save the file with original name. You can modify to avoid name collisions.
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// POST /api/upload
router.post("/upload", upload.array("reports", 5), uploadReports);

module.exports = router;
