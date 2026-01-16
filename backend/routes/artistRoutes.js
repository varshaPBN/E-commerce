const mongoose = require("mongoose")
const Artists = mongoose.model("artists")
const jwt = require("jsonwebtoken");
const sendOtpMail = require("../utils/mailer"); //otp
const userAuth = require("../middleware/userAuth");
const otpStore = new Map();

const otpLength = 6;

module.exports = (app) => {
  app.post("/api/v1/artist/signup/email", async (req,res) =>{
    const { email } = req.body;

    try {
      // Check if artist already exists and is verified
      const existingArtist = await Artists.findOne({ email });
      
      if (existingArtist && existingArtist.isEmailVerified) {
        return res.status(400).json({ message: "Artist already exists" });
      }

      const digits = "0123456789";
      let newOTP = "";
      for (let i = 0; i < otpLength; i++) {
        newOTP += digits[Math.floor(Math.random() * 10)];
      }
      
      console.log("newOTP: ", newOTP);
      await sendOtpMail(email, newOTP); //otp
      
      if (!existingArtist) {
        const response = await Artists.create({ email, otp: newOTP });
        res.status(201).json({ message: "OTP Sent Successfully", response });
      } else {
        // Artist exists but not verified, update OTP
        const response = await Artists.updateOne({ email }, { otp: newOTP });
        res.status(201).json({ message: "OTP Sent Successfully", response });
      }
      
    } catch (error) {
      console.log(error);
        res.status(500).json({ message: error.message });
    }
  });


app.post("/api/v1/artist/signup/otp", async (req, res) => {
    try {
      const { email, otp } = req.body;
      console.log(email, otp);

      const artist = await Artists.findOne({ email });
      console.log(artist);

      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }

      if (artist.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      await Artists.updateOne(
        { email },
        { isEmailVerified: true, otp: null }
      );

      const payload = {
        id: artist._id.toString(),
        email: artist.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      });

      res.status(200).json({ message: "SignUp Success", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });

app.post("/api/v1/artist/signup/profile", async (req, res) => {
  const { email, name, storeName, domain, logo, avatar } = req.body;
  try {
    // Check if artist exists
    const artist = await Artists.findOne({ email });
    if (!artist) {
      console.error("Artist not found for email:", email);
      return res.status(404).json({ message: "Artist not found. Please complete signup first." });
    }

    // Update artist profile
    const response = await Artists.updateOne(
      { email },
      {
        $set: {
          name,
          storeName,
          domain,
          logo,
          avatar
        }
      }
    );

    // Check if update was successful
    if (response.matchedCount === 0) {
      console.error("No artist matched for email:", email);
      return res.status(404).json({ message: "Artist not found" });
    }

    console.log("Artist profile updated successfully for:", email);
    res.status(200).json({ 
      message: "Artist profile completed successfully", 
      response 
    });
  } catch (error) {
    console.error("Error updating artist profile:", error);
    console.error("Error stack:", error.stack);
    res.status(500).json({ 
      message: error.message,
      error: error.toString()
    });
  }
})

  //Login using otp
  app.post("/api/v1/artist/login", async (req, res) => {
      try {
        const { email } = req.body;
  
        const digits = "0123456789";
        let newOTP = "";
        for (let i = 0; i < otpLength; i++) {
          newOTP += digits[Math.floor(Math.random() * 10)];
        }
        console.log("newOTP: ", newOTP);
        await sendOtpMail(email, newOTP);
  
        const user = await Artists.findOne({ email });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        } else {
          // Send OTP email
          await sendOtpMail(email, newOTP);
          // Update OTP in database
          const response = await Artists.updateOne({ email }, { otp: newOTP });
          res.status(201).json({ message: "OTP Sent Successfully", response });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    });
  
    // Verify OTP for login
    app.post("/api/v1/artist/verify-otp", async (req, res) => {
      try {
        const { email, otp } = req.body;

        const user = await Artists.findOne({ email });

        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
  
        if (user && user.otp === otp) {
          const payload = {
            id: user._id.toString(),
            email: user.email,
          };

          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN || "7d",
          });
          
          await Artists.updateOne({ email }, { otp: null });

          res.status(200).json({ message: "Login Success", token });
        }else{
            return res.status(400).json({ message: "Invalid OTP" });
        }
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
      }
    });

  // Get artist profile info (authenticated)
  app.get("/api/v1/artist/profile", userAuth, async (req, res) => {
    try {
      console.log("Profile request - User ID:", req.user?.id);
      const artist = await Artists.findById(req.user.id);
      if (!artist) {
        console.error("Artist not found for ID:", req.user.id);
        return res.status(404).json({ message: "Artist not found" });
      }
      res.status(200).json({ 
        message: "Artist profile fetched successfully", 
        artist 
      });
    } catch (error) {
      console.error("Profile endpoint error:", error);
      console.error("Error stack:", error.stack);
      res.status(500).json({ 
        message: error.message,
        error: error.toString()
      });
    }
  });

  // Get artist info by ID (public endpoint)
  app.get("/api/v1/artist/:artistId", async (req, res) => {
    try {
      const { artistId } = req.params;
      const artist = await Artists.findById(artistId).select("name storeName logo avatar");
      
      if (!artist) {
        return res.status(404).json({ message: "Artist not found" });
      }
      
      res.status(200).json({ 
        message: "Artist info fetched successfully", 
        artist 
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });
}