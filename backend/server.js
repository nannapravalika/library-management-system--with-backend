const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");
const createDefaultAdmin = require("./utils/createDefaultAdmin");

dotenv.config();

const app = express();

// ===============================
// Security & Middleware
// ===============================

app.use(helmet());

app.use(cors({
    origin: "*",
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== "production") {
    app.use(morgan("dev"));
}

// ===============================
// API Routes
// ===============================

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/issues", require("./routes/issueRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// ===============================
// Health Check
// ===============================

app.get("/api/health", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Library Management API is running",
        timestamp: new Date()
    });
});

// ===============================
// Frontend
// ===============================

const frontendPath = path.join(__dirname, "../frontend");

app.use(express.static(frontendPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
});

// ===============================
// 404 Handler
// ===============================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route Not Found"
    });
});

// ===============================
// Global Error Handler
// ===============================

app.use((err, req, res, next) => {
    console.error(err.stack);

    res.status(500).json({
        success: false,
        message: "Internal Server Error"
    });
});

// ===============================
// Start Server
// ===============================

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {

        await connectDB();

        await createDefaultAdmin();

        app.listen(PORT, () => {

            console.log("======================================");
            console.log("📚 Library Management System");
            console.log(`🚀 Server : http://localhost:${PORT}`);
            console.log(`📅 Started: ${new Date().toLocaleString()}`);
            console.log("======================================");

        });

    } catch (error) {

        console.error("Server startup failed");
        console.error(error.message);

        process.exit(1);

    }
};

startServer();