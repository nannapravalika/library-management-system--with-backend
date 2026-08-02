const Book = require("../models/Book");

// Add Book
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
            quantity,
            availableCopies: quantity,
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

// Get All Books
const getBooks = async (req, res) => {

    try {

        const books = await Book.find().sort({
            createdAt: -1
        });

        res.json({
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

// Get Single Book
const getBook = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book not found."
            });

        }

        res.json({
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

// Update Book
const updateBook = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book not found."
            });

        }

        const issuedCopies = book.quantity - book.availableCopies;

        book.bookId = req.body.bookId;
        book.title = req.body.title;
        book.author = req.body.author;
        book.category = req.body.category;
        book.isbn = req.body.isbn;
        book.quantity = req.body.quantity;
        book.shelf = req.body.shelf;

        // Recalculate available copies
        book.availableCopies = req.body.quantity - issuedCopies;

        if (book.availableCopies < 0) {
            book.availableCopies = 0;
        }

        await book.save();
        res.json({
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

// Delete Book
const deleteBook = async (req, res) => {

    try {

        const book = await Book.findById(req.params.id);

        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book not found."
            });

        }
        const issued = await Issue.findOne({
            book: book._id,
            status: "Issued"
        });

        if (issued) {
            return res.status(400).json({
                success: false,
                message: "Book is currently issued and cannot be deleted."
            });
        }
        await book.deleteOne();

        res.json({
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

// Search Books
const searchBooks = async (req, res) => {

    try {

        const keyword = req.query.keyword || "";

        const books = await Book.find({
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { author: { $regex: keyword, $options: "i" } },
                { category: { $regex: keyword, $options: "i" } },
                { isbn: { $regex: keyword, $options: "i" } },
                { bookId: { $regex: keyword, $options: "i" } }
            ]
        });

        res.json({
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