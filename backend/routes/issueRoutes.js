const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {

    issueBook,

    returnBook,

    getIssues,

    getIssue,

    filterIssues

} = require("../controllers/issueController");

router.use(authMiddleware);

router.post("/", issueBook);

router.get("/", getIssues);

router.get("/filter", filterIssues);

router.get("/:id", getIssue);

router.put("/return/:id", returnBook);

module.exports = router;