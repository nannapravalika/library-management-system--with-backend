const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

const connectDB = require("./config/db");
const seedAdmin = require("./utils/createDefaultAdmin");

dotenv.config();

const app = express();

// Database
connectDB();

// Create Admin Once
seedAdmin();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/issues", require("./routes/issueRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// =============================
// Frontend
// =============================

const frontendPath = path.join(__dirname, "../frontend");

app.use(express.static(frontendPath));

// Open index.html
app.get("/", (req, res) => {

    res.sendFile(path.join(frontendPath, "index.html"));

});

// Any page
app.get("*", (req, res) => {

    res.sendFile(path.join(frontendPath, "index.html"));

});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on http://localhost:${PORT}`);

});