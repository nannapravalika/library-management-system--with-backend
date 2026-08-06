const express = require("express");

const router = express.Router();

const auth = require("../middleware/authMiddleware");

const {
    addBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    searchBooks
} = require("../controllers/bookController");

// ==============================
// Book Routes
// ==============================

// Search Books
router.get("/search", auth, searchBooks);

// Get All Books
router.get("/", auth, getBooks);

// Get Single Book
router.get("/:id", auth, getBook);

// Add Book
router.post("/", auth, addBook);

// Update Book
router.put("/:id", auth, updateBook);

// Delete Book
router.delete("/:id", auth, deleteBook);

module.exports = router;