const express = require("express");
const upload = require("../config/multer");

const router = express.Router();

router.post("/upload", upload.single("file"), (req, res) => {
  res.json({
    message: "Image uploaded successfully",
    fileUrl: req.file.location,
    fileName: req.file.key,
  });
});

module.exports = router;
