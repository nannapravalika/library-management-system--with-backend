const Book = require("../models/Book");
const Member = require("../models/Member");
const Issue = require("../models/Issue");

const getDashboard = async (req, res) => {

    try {

        const totalBooks = await Book.countDocuments();

        const totalMembers = await Member.countDocuments();

        const totalIssued = await Issue.countDocuments({
            status: "Issued"
        });

        const totalReturned = await Issue.countDocuments({
            status: "Returned"
        });

        const availableBooks = await Book.aggregate([
            {
                $group: {
                    _id: null,
                    total: {
                        $sum: "$availableCopies"
                    }
                }
            }
        ]);

        res.json({

            success: true,

            dashboard: {

                totalBooks,

                totalMembers,

                totalIssued,

                totalReturned,

                availableBooks:
                    availableBooks.length > 0
                        ? availableBooks[0].total
                        : 0

            }

        });

    } catch (error) {

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    getDashboard
};