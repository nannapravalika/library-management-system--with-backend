const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addMember,
    getMembers,
    getMember,
    updateMember,
    deleteMember,
    searchMembers
} = require("../controllers/memberController");

router.use(authMiddleware);

router.post("/", addMember);

router.get("/", getMembers);

router.get("/search", searchMembers);

router.get("/:id", getMember);

router.put("/:id", updateMember);

router.delete("/:id", deleteMember);

module.exports = router;