const Book = require("../models/Book");
const Issue = require("../models/Issue");

// ======================================
// Add Book
// ======================================

const addBook = async (req, res) => {
    try {

        const {
            bookId,
            title,
            author,
            category,
            isbn,
            quantity,
            shelf
        } = req.body;

        if (!bookId || !title || !author || !category || !isbn || !quantity) {
            return res.status(400).json({
                success: false,
                message: "All required fields are mandatory."
            });
        }

        const existingBook = await Book.findOne({
            $or: [
                { bookId },
                { isbn }
            ]
        });

        if (existingBook) {
            return res.status(400).json({
                success: false,
                message: "Book ID or ISBN already exists."
            });
        }

        const book = await Book.create({
            bookId,
            title,
            author,
            category,
            isbn,
            quantity: Number(quantity),
            availableCopies: Number(quantity),
            shelf
        });

        res.status(201).json({
            success: true,
            message: "Book added successfully.",
            book
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};

// ======================================
// Get All Books
// ======================================

const getBooks = async (req, res) => {

    try {

        const books = await Book.find()
            .sort({ createdAt: -1 })
            .lean();

        res.status(200).json({
            success: true,
            count: books.length,
            books
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// Get Single Book
// ======================================

const getBook = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found."
            });
        }

        res.status(200).json({
            success: true,
            book
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// Update Book
// ======================================

const updateBook = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found."
            });
        }

        const duplicate = await Book.findOne({
            _id: { $ne: req.params.id },
            $or: [
                { bookId: req.body.bookId },
                { isbn: req.body.isbn }
            ]
        });

        if (duplicate) {
            return res.status(400).json({
                success: false,
                message: "Book ID or ISBN already exists."
            });
        }

        const issuedCopies = book.quantity - book.availableCopies;

        book.bookId = req.body.bookId;
        book.title = req.body.title;
        book.author = req.body.author;
        book.category = req.body.category;
        book.isbn = req.body.isbn;
        book.quantity = Number(req.body.quantity);
        book.shelf = req.body.shelf;

        book.availableCopies = book.quantity - issuedCopies;

        if (book.availableCopies < 0) {
            book.availableCopies = 0;
        }

        await book.save();

        res.status(200).json({
            success: true,
            message: "Book updated successfully.",
            book
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// Delete Book
// ======================================

const deleteBook = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({
                success: false,
                message: "Book not found."
            });
        }

        const issuedBook = await Issue.findOne({
            book: book._id,
            status: "Issued"
        });

        if (issuedBook) {
            return res.status(400).json({
                success: false,
                message: "Book is currently issued and cannot be deleted."
            });
        }

        await book.deleteOne();

        res.status(200).json({
            success: true,
            message: "Book deleted successfully."
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

// ======================================
// Search Books
// ======================================

const searchBooks = async (req, res) => {

    try {

        const keyword = req.query.keyword?.trim() || "";

        const books = await Book.find({
            $or: [
                { bookId: { $regex: keyword, $options: "i" } },
                { title: { $regex: keyword, $options: "i" } },
                { author: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } },
                { isbn: { $regex: keyword, $options: "i" } }
            ]
        }).lean();

        res.status(200).json({
            success: true,
            count: books.length,
            books
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    addBook,
    getBooks,
    getBook,
    updateBook,
    deleteBook,
    searchBooks
};