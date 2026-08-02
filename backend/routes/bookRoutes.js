const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const {
    addBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    searchBooks
} = require("../controllers/bookController");

router.use(authMiddleware);

router.post("/", addBook);

router.get("/", getBooks);

router.get("/search", searchBooks);

router.get("/:id", getBook);

router.put("/:id", updateBook);

router.delete("/:id", deleteBook);

module.exports = router;