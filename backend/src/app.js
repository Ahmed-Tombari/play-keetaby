const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const pool = require("./config/db");

const userAuthRoutes = require("./routes/userAuthRoutes");
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const categoriesRoutes = require("./routes/categories.routes");
const gamesRoutes = require("./routes/games.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Keetaby Academy API Running");
});

app.get("/health", (req, res) => res.json({ status: "ok" }));

app.get("/api/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Auth (raw SQL / pg)
app.use("/api/user", userAuthRoutes);
app.use("/api/admin", adminAuthRoutes);

// Platform content (Prisma)
app.use("/api/categories", categoriesRoutes);
app.use("/api/games", gamesRoutes);

// 404
app.use((req, res) => res.status(404).json({ error: "Route introuvable" }));

// Gestionnaire d'erreurs global (doit être en dernier)
app.use(errorHandler);

module.exports = app;
