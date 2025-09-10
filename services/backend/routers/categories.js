import express from "express";
const router = express.Router();
import db from "../db.js";

// GET /api/categories - List all categories
router.get("/", async (req, res) => {
  const categories = await db.categories.findAll();
  res.json(categories);
});

// GET /api/categories/:slug - Get category details and products
router.get("/:slug", async (req, res) => {
  const category = await db.categories.findOne({ where: { slug: req.params.slug } });
  if (!category) return res.status(404).json({ error: "Category not found" });
  const products = await db.products.findAll({ where: { categoryId: category.id } });
  res.json({ category, products });
});

export default router;
