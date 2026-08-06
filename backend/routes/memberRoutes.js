const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    addMember,
    getMembers,
    getMember,
    updateMember,
    deleteMember,
    searchMembers
} = require("../controllers/memberController");

// ==============================
// Member Routes
// ==============================

// Search Members
router.get("/search", auth, searchMembers);

// Get All Members
router.get("/", auth, getMembers);

// Get Single Member
router.get("/:id", auth, getMember);

// Add Member
router.post("/", auth, addMember);

// Update Member
router.put("/:id", auth, updateMember);

// Delete Member
router.delete("/:id", auth, deleteMember);

module.exports = router;