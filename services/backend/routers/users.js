import express from "express";
const router = express.Router();
import db from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

// POST /api/auth/signin - User login
router.post("/auth/signin", async (req, res) => {
  // Implement login logic
  res.json({ message: "Login successful" });
});

// POST /api/auth/signup - User registration
router.post("/auth/signup", async (req, res) => {
  // Implement signup logic
  res.json({ message: "Signup successful" });
});

// GET /api/profile - Get user profile (protected)
router.get("/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await db.users.findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    // Exclude sensitive fields like password
    const { password, ...userData } = user.dataValues;
    res.json({ profile: userData });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
});

export default router;
