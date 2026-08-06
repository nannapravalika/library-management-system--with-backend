const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    getDashboard
} = require("../controllers/dashboardController");

// ==============================
// Dashboard Routes
// ==============================

// Dashboard Statistics
router.get("/", auth, getDashboard);

module.exports = router;