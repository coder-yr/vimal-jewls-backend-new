import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import uploadRoutes from "./upload_file.js";
dotenv.config();

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/images", express.static("images"));
// API Routes
app.use("/api", uploadRoutes);

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
// Start Server
app.listen(port, () => {
  console.log(`🚀 Vimal Jewellers Backend running on port ${port}`);
});
