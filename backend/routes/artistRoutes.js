const mongoose = require("mongoose")
const Artists = mongoose.model("artists")
const jwt = require("jsonwebtoken");

const otpLength = 6;

module.exports = (app) => {
  app.post("/api/v1/artist/signup/email", async (req,res) =>{
    const { email } = req.body;

    try {

      const digits = "0123456789";
      let newOTP = "";
      for (let i = 0; i < otpLength; i++) {
        newOTP += digits[Math.floor(Math.random() * 10)];
      }
      
      console.log("newOTP: ", newOTP);
      const artist = await Artists.findOne({ email });

       if (!artist) {
        const response = await Artists.create({ email, otp: newOTP });
        res.status(201).json({ message: "OTP Sent Successfully", response });
      } else {
        const response = await Artists.updateOne({ email }, { otp: newOTP });
        res.status(201).json({ message: "OTP Sent Successfully", response });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });


app.post("/api/v1/artist/signup/otp", async (req, res) => {
    console.log("Verify OTP 1");
    try {
      const { email, otp } = req.body;
      console.log("Verify OTP 2", email, otp);

      const artist = await Artists.findOne({ email });
      console.log("Verify OTP 3", artist);

      if (artist && artist.otp === otp) {
        await Artists.updateOne(
        { email },
        { isEmailVerified: true, otp: null }
      );

        const payload = {
          id: artist._id,
          email: artist.email,
        };
        console.log("Verify OTP 4");

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });
        console.log("Verify OTP 5");

        res.status(200).json({ message: "SignUp Success", token });
        console.log("Verify OTP 6");
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });

app.post("/api/v1/artist/signup/profile",async (req,res)=>{
  const { email, name, storeName, domain, logo, avathar } = req.body;
  try{
    const response = await Artists.updateOne(
      {email},
      {
        $set : {
        name,
        storeName,
        domain,
        logo,
        avathar
        }
      }
    );
    res.status(200).json({ message: "Artist profile completed successfully", response });
  }catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
})

  app.post("/api/v1/artist/login", async (req, res) => {
      try {
        const { email } = req.body;
  
        const digits = "0123456789";
        let newOTP = "";
        for (let i = 0; i < otpLength; i++) {
          newOTP += digits[Math.floor(Math.random() * 10)];
        }
        console.log("newOTP: ", newOTP);
  
        const user = await Artists.findOne({ email });
        if (!user) {
          res.status(404).json({ message: "User not found" });
        } else {
          const response = await Artists.updateOne({ email }, { otp: newOTP });
          res.status(201).json({ message: "OTP Sent Successfully", response });
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
      }
    });
  
    // Verify OTP for login
    app.post("/api/v1/artist/verify-otp", async (req, res) => {
      try {
        const { email, otp } = req.body;
  
        const user = await Artists.findOne({ email });
  
        if (user && user.otp === otp) {
          const payload = {
            id: user._id,
            email: user.email,
          };
  
          const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
          });
  
          res.status(200).json({ message: "Login Success", token });
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
      }
    });
}