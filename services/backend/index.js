import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import uploadRoutes from "./upload_file.js";
import productsRouter from "./routers/products.js";
import authRouter from "./routers/auth.js";
import categoriesRouter from "./routers/categories.js";
import collectionsRouter from "./routers/collections.js";
import cartRouter from "./routers/cart.js";
import ordersRouter from "./routers/orders.js";
import usersRouter from "./routers/users.js";
import bannersRouter from "./routers/banners.js";
import homeRouter from "./routers/home.js";
import db from "./db.js";
import wishlistRouter from "./routers/wishlist.js";
import { buildAdminRouter } from "../admin/index.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:7503",
      "https://elegant-pavlova-e96b18.netlify.app"
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  })
);
// Mount AdminJS early, before body parsers, per AdminJS guidance
const adminRouter = await buildAdminRouter({
  rootPath: "/admin",
  corsOrigins: [
    "http://localhost:3000",
    "http://localhost:7503",
    "https://elegant-pavlova-e96b18.netlify.app",
    process.env.FRONTEND_ORIGIN,
    process.env.ADMIN_ORIGIN,
  ].filter(Boolean),
});
app.use("/", adminRouter);

// Body parsers and other middleware AFTER AdminJS
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("images"));

// API Routes

// API Routers
app.use("/api/products", productsRouter);
app.use("/api/auth", authRouter);
app.use("/api/categories", categoriesRouter);
app.use("/api/collections", collectionsRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", ordersRouter);
app.use("/api", usersRouter);
app.use("/api/banners", bannersRouter);
app.use("/api/home", homeRouter);
app.use("/api", uploadRoutes);
app.use("/api/wishlist", wishlistRouter);

// AdminJS already mounted above

// Root Route with Admin Login Button
app.get("/", (req, res) => {
  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Vimal Jewellers Backend</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 0;
          padding: 0;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .container {
          background: white;
          padding: 2rem;
          border-radius: 12px;
          box-shadow: 0 10px 30px rgba(0,0,0,0.2);
          text-align: center;
          max-width: 400px;
          width: 90%;
        }
        h1 {
          color: #333;
          margin-bottom: 1rem;
          font-size: 1.8rem;
        }
        p {
          color: #666;
          margin-bottom: 2rem;
          font-size: 1rem;
        }
        .admin-btn {
          background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          color: white;
          padding: 12px 30px;
          border: none;
          border-radius: 6px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          text-decoration: none;
          display: inline-block;
          transition: all 0.3s ease;
          margin-bottom: 1rem;
        }
        .admin-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(238, 90, 36, 0.4);
        }
        .status {
          background: #f8f9fa;
          padding: 1rem;
          border-radius: 6px;
          margin-top: 1.5rem;
          color: #495057;
          font-size: 0.9rem;
        }
        .api-info {
          margin-top: 1rem;
          padding: 1rem;
          background: #e9ecef;
          border-radius: 6px;
          font-size: 0.85rem;
          color: #6c757d;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>🏪 Vimal Jewellers Backend</h1>
        <p>Backend API is running successfully</p>
        
        <a href="/admin" class="admin-btn">
          🔐 Login as Admin
        </a>
        
        <div class="status">
          <strong>Status:</strong> ✅ Active<br>
          <strong>Port:</strong> ${process.env.PORT || 7502}<br>
          <strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}
        </div>
        
        <div class="api-info">
          <strong>API Endpoints:</strong><br>
          • <code>/api/products</code><br>
          • <code>/api/categories</code><br>
          • <code>/api/collections</code><br>
          • <code>/api/auth</code><br>
          • <code>/admin</code> - Admin Panel
        </div>
      </div>
    </body>
    </html>
  `;
  res.send(html);
});

// Fallback Route for undefined routes
app.use((req, res) => {
  res.status(404).send("404: Route not found");
});

// Centralized Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

const port = process.env.PORT || 7502;

// Ensure all tables are created before starting the server
db.sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`🚀 Vimal Jewellers Backend running on port ${port}`);
  });
});
