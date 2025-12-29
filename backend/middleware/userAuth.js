const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({message: "Unauthorized"});
    try {
        req.user = {
            id: new mongoose.Types.ObjectId(jwt.verify(token, process.env.JWT_SECRET).id)
        };
        next();
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
}