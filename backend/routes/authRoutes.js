const mongoose = require("mongoose");
const users = mongoose.model("users");
const sendOtpMail = require("../utils/mailer"); //otp
const otpStore = new Map();
module.exports = (app) => {
    //add users
    app.post("/api/v1/user/add", async (req,res)=>{
        console.log("USER ADDED");
        const {name,email} = req.body;

        try{
            const user = await users.findOne({email});
            if(user){
                return res.status(400).json({ message: "User already exists" });
            }

            userFields = {name, email};

            const response = await users.create(userFields);
            res.status(201).json({ message: "User added successfully", response });
        } catch (error){
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    })
    //get all users
    app.get("/api/v1/get/users", async (req, res) => {
      console.log("Users retrieved");
      try{
            const user = await users.find();
            res.status(201).json({ message: "User fetched successfully!", user });
        } catch (error){
            console.log(error);
            res.status(500).json({ message: error.message });
        }
    });

    // send otp
    app.post("/api/v1/send-otp", async (req, res) => {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000);

    otpStore.set(email, {
      otp,
      expiresAt: Date.now() + 5 * 60 * 1000, // 5 mins
    });

    try {
      await sendOtpMail(email, otp);
      res.json({ message: "OTP sent successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  });

  // verify otp

  app.post("/api/v1/verify-otp", (req, res) => {
    const { email, otp } = req.body;

    const record = otpStore.get(email);

    if (!record) {
      return res.status(400).json({ message: "OTP not found" });
    }

    if (Date.now() > record.expiresAt) {
      return res.status(400).json({ message: "OTP expired" });
    }

    if (Number(otp) !== record.otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    otpStore.delete(email);
    res.json({ message: "OTP verified successfully" });
  });

};