const mongoose = require("mongoose");

const ReportSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  filename: { type: String, required: true },
  filePath: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Report", ReportSchema);
