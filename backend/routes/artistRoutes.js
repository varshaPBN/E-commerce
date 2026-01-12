const mongoose = require("mongoose")
const Artists = mongoose.model("artists")
const jwt = require("jsonwebtoken");
const sendOtpMail = require("../utils/mailer"); //otp
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
        id: artist._id,
        email: artist.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
      });

      res.status(200).json({ message: "SignUp Success", token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });

app.post("/api/v1/artist/signup/profile",async (req,res)=>{
  const { email, name, storeName, domain, logo, avatar } = req.body;
  try{
    const response = await Artists.updateOne(
      {email},
      {
        $set : {
        name,
        storeName,
        domain,
        logo,
        avatar
        }
      }
    );
    res.status(200).json({ message: "Artist profile completed successfully", response });
  }catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
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
            id: user._id,
            email: user.email,
          };
  
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
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
}