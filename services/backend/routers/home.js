import express from "express";
const router = express.Router();
import db from "../db.js";

// GET /api/home - Get home page data
router.get("/", async (req, res) => {
  // Example: featured products, banners, etc.
  const banners = await db.banners.findAll();
  const featuredProducts = await db.products.findAll({ limit: 8 });
  res.json({ banners, featuredProducts });
});

export default router;
