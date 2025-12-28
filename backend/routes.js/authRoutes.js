const mongoose = require("mongoose");
const users = mongoose.model("users");

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
};