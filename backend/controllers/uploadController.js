const fs = require("fs");
const pdfParse = require("pdf-parse");

exports.uploadReports = async (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: "No files uploaded." });
  }

  try {
    const results = [];

    // Process each uploaded PDF file
    for (const file of req.files) {
      const dataBuffer = fs.readFileSync(file.path);
      const pdfData = await pdfParse(dataBuffer);
      // You can then parse pdfData.text to extract specific blood parameters
      results.push({
        file: file.filename,
        text: pdfData.text.substring(0, 200) + "...", // Return first 200 characters for demo
      });
    }

    res
      .status(200)
      .json({ message: "Files processed successfully.", data: results });
  } catch (error) {
    console.error("Error processing PDF files:", error);
    res.status(500).json({ error: "Failed to process PDF files." });
  }
};
