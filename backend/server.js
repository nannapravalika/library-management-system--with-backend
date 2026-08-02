require("dotenv").config();

const express = require("express");
const cors = require("cors");

const connectDB = require("./config/db");
const createDefaultAdmin = require("./utils/createDefaultAdmin");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/books", require("./routes/bookRoutes"));
app.use("/api/members", require("./routes/memberRoutes"));
app.use("/api/issues", require("./routes/issueRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

// Test Route
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Library Management API Running"
    });
});

const PORT = process.env.PORT || 5000;

// Connect DB → Create Admin → Start Server
const startServer = async () => {
    try {
        await connectDB();

        await createDefaultAdmin();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log(error.message);
    }
};

startServer();
