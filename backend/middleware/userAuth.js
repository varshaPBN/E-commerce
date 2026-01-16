const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({ message: "Unauthorized - No token provided" });
        }

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is not configured");
            return res.status(500).json({ message: "Server configuration error" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!decoded || !decoded.id) {
            return res.status(401).json({ message: "Invalid token - Missing user ID" });
        }

        req.user = {
            id: new mongoose.Types.ObjectId(decoded.id)
        };
        next();
    } catch (error) {
        console.error("Auth middleware error:", error);
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: "Invalid token" });
        }
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Token expired" });
        }
        if (error.name === 'CastError' || error.message.includes('ObjectId')) {
            return res.status(401).json({ message: "Invalid user ID in token" });
        }
        return res.status(500).json({ message: "Authentication error", error: error.message });
    }
}