const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    issueBook,
    returnBook,
    getIssues,
    getIssue,
    filterIssues
} = require("../controllers/issueController");

// ==============================
// Issue Routes
// ==============================

// Filter Issues
router.get("/filter", auth, filterIssues);

// Get All Issues
router.get("/", auth, getIssues);

// Get Single Issue
router.get("/:id", auth, getIssue);

// Issue Book
router.post("/", auth, issueBook);

// Return Book
router.put("/return/:id", auth, returnBook);

module.exports = router;