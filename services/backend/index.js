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

// Root Route
app.get("/", (req, res) => {
  res.send("Welcome to the Vimal Jewellers Backend!");
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
