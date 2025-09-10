import express from "express";
const router = express.Router();
import db from "../db.js";
import { authenticateToken } from "../middleware/auth.js";

// POST /api/orders - Place an order
router.post("/", authenticateToken, async (req, res) => {
  const order = await db.orders.create({ ...req.body, userId: req.user.id });
  res.status(201).json(order);
});

// GET /api/orders/:id - Get order details
router.get("/:id", authenticateToken, async (req, res) => {
  const order = await db.orders.findOne({ where: { id: req.params.id, userId: req.user.id } });
  if (!order) return res.status(404).json({ error: "Order not found" });
  res.json(order);
});

export default router;
