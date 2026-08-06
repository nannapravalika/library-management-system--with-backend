const Book = require("../models/Book");
const Member = require("../models/Member");
const Issue = require("../models/Issue");

// ======================================
// Dashboard Statistics
// ======================================

const getDashboard = async (req, res) => {

    try {

        const [
            totalBooks,
            totalMembers,
            totalIssuedBooks,
            availableBooks,
            recentIssues
        ] = await Promise.all([

            Book.countDocuments(),

            Member.countDocuments(),

            Issue.countDocuments({ status: "Issued" }),

            Book.aggregate([
                {
                    $group: {
                        _id: null,
                        total: {
                            $sum: "$availableCopies"
                        }
                    }
                }
            ]),

            Issue.find()
                .populate("member", "memberId name")
                .populate("book", "bookId title")
                .populate("issuedBy", "name")
                .sort({ createdAt: -1 })
                .limit(5)
                .lean()

        ]);

        res.status(200).json({

            success: true,

            totalBooks,

            totalMembers,

            totalIssuedBooks,

            availableBooks:
                availableBooks.length > 0
                    ? availableBooks[0].total
                    : 0,

            recentIssues

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    getDashboard
};