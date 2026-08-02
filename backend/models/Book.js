const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
    {
        bookId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        title: {
            type: String,
            required: true,
            trim: true
        },
        author: {
            type: String,
            required: true,
            trim: true
        },
        category: {
            type: String,
            required: true
        },
        isbn: {
            type: String,
            required: true,
            unique: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        availableCopies: {
            type: Number,
            required: true,
            min: 0
        },
        shelf: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Book", bookSchema);