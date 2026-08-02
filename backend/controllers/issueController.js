const Issue = require("../models/Issue");
const Book = require("../models/Book");
const Member = require("../models/Member");

// =========================
// Issue Book
// =========================

const issueBook = async (req, res) => {

    try {

        const {
            memberId,
            bookId,
            dueDate
        } = req.body;

        const member = await Member.findById(memberId);

        if (!member) {

            return res.status(404).json({
                success: false,
                message: "Member not found."
            });

        }

        const book = await Book.findById(bookId);

        if (!book) {

            return res.status(404).json({
                success: false,
                message: "Book not found."
            });

        }

        if (book.availableCopies <= 0) {

            return res.status(400).json({
                success: false,
                message: "Book is out of stock."
            });

        }

        const issue = await Issue.create({

            member: member._id,

            book: book._id,

            issuedBy: req.admin.id,

            dueDate

        });

        book.availableCopies -= 1;

        await book.save();

        res.status(201).json({

            success: true,

            message: "Book Issued Successfully.",

            issue

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =========================
// Return Book
// =========================

const returnBook = async (req, res) => {

    try {

        const issue = await Issue.findById(req.params.id);

        if (!issue) {

            return res.status(404).json({

                success: false,

                message: "Issue Record Not Found."

            });

        }

        if (issue.status === "Returned") {

            return res.status(400).json({

                success: false,

                message: "Book already returned."

            });

        }

        issue.status = "Returned";

        issue.returnDate = new Date();

        await issue.save();
        
        const existingIssue = await Issue.findOne({
            member: member._id,
            book: book._id,
            status: "Issued"
        });

        if (existingIssue) {
            return res.status(400).json({
                success: false,
                message: "This member already has this book issued."
            });
        }

        const book = await Book.findById(issue.book);

        book.availableCopies += 1;

        await book.save();

        res.json({

            success: true,

            message: "Book Returned Successfully."

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =========================
// Get All Issue History
// =========================

const getIssues = async (req, res) => {

    try {

        const issues = await Issue.find()

            .populate("member")

            .populate("book")

            .populate("issuedBy", "name email")

            .sort({

                createdAt: -1

            });

        res.json({

            success: true,

            count: issues.length,

            issues

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =========================
// Get Single Issue
// =========================

const getIssue = async (req, res) => {

    try {

        const issue = await Issue.findById(req.params.id)

            .populate("member")

            .populate("book")

            .populate("issuedBy", "name email");

        if (!issue) {

            return res.status(404).json({

                success: false,

                message: "Issue not found."

            });

        }

        res.json({

            success: true,

            issue

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

// =========================
// Filter
// =========================

const filterIssues = async (req, res) => {

    try {

        const status = req.query.status;

        const issues = await Issue.find({

            status

        })

        .populate("member")

        .populate("book")

        .populate("issuedBy", "name email");

        res.json({

            success: true,

            count: issues.length,

            issues

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {

    issueBook,

    returnBook,

    getIssues,

    getIssue,

    filterIssues

};