import express from "express";
const router = express.Router();
import db from "../db.js";
import { Op } from "sequelize";

// GET /api/categories - List all categories
router.get("/", async (req, res) => {
  const categories = await db.categories.findAll();
  res.json(categories);
});

// GET /api/categories/:slug - Get category details and products
router.get("/:slug", async (req, res) => {
  const category = await db.categories.findOne({ where: { slug: req.params.slug } });
  if (!category) return res.status(404).json({ error: "Category not found" });

  // Build filter conditions (only price in SQL, others in JS)
  const where = { categoryId: category.id };

  // Price filter
  if (req.query.price) {
    // price=under-5000,5000-10000,above-20000
    const priceFilters = req.query.price.split(',');
    const priceConditions = [];
    priceFilters.forEach((range) => {
      if (range === 'under-5000') priceConditions.push({ price: { [Op.lt]: 5000 } });
      if (range === '5000-10000') priceConditions.push({ price: { [Op.gte]: 5000, [Op.lte]: 10000 } });
      if (range === '10000-20000') priceConditions.push({ price: { [Op.gte]: 10000, [Op.lte]: 20000 } });
      if (range === 'above-20000') priceConditions.push({ price: { [Op.gt]: 20000 } });
    });
    if (priceConditions.length > 0) {
      where[Op.or] = priceConditions;
    }
  }

  let products = await db.products.findAll({ where });

  // Material/style filter in JS (from productDetails JSON)
  if (req.query.material || req.query.style) {
    products = products.filter((product) => {
      let match = true;
      if (req.query.material) {
        const materialFilters = req.query.material.split(',').map((m) => m.toLowerCase());
        const prodMaterial = product.productDetails?.material || product.material;
        if (prodMaterial) {
          match = match && materialFilters.includes(prodMaterial.toLowerCase());
        } else {
          match = false;
        }
      }
      if (req.query.style) {
        const styleFilters = req.query.style.split(',').map((s) => s.toLowerCase());
        const prodStyle = product.productDetails?.style || product.style;
        if (prodStyle) {
          match = match && styleFilters.includes(prodStyle.toLowerCase());
        } else {
          match = false;
        }
      }
      return match;
    });
  }

  res.json({ category, products });
});

export default router;
