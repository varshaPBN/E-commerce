require("dotenv").config();
const express = require("express"); // npm i express
const mongoose = require("mongoose"); //npm i mongoose
require("dotenv").config(); // Load environment variables. Make sure .env is in .gitignore
const imageRoutes = require("./routes/imageRoutes"); //AWS Dynamic loading
const port = process.env.PORT || 5001;
const s3 = require("./config/s3");
const upload = require("./config/multer"); // ← import your multer-s3 config

const { ListObjectsV2Command } = require("@aws-sdk/client-s3"); //aws

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", imageRoutes); //AWS
mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });


  // AWS

 
// Upload API
app.post("/api/upload", upload.single("image"), (req, res) => {
  try {
    res.json({
      message: "Image uploaded successfully",
      fileUrl: req.file.location,
      fileName: req.file.key
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// List Images API
app.get("/api/images", async (req, res) => {
  try {
    const command = new ListObjectsV2Command({ Bucket: process.env.S3_BUCKET });
    const data = await s3.send(command);
    const fileNames = data.Contents.map(file => file.Key);
    res.json({ images: fileNames });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});


// Models

require("./models/User")
require("./models/Product")
require("./models/Cart")
require("./models/Order") 
require("./models/Artist")
require("./models/Admin")


// Routes
require("./routes/cartRoutes")(app)
require("./routes/userRoutes")(app)
require("./routes/artistRoutes")(app)
require("./routes/productRoutes")(app)
require("./routes/orderRoutes")(app)
require("./routes/adminRoutes")(app)
require("./routes/dashboardRoutes")(app)
require("./routes/authRoutes")(app)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});  