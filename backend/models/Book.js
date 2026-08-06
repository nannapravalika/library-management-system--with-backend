const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
{
    bookId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        uppercase:true
    },

    title:{
        type:String,
        required:true,
        trim:true
    },

    author:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        required:true,
        trim:true
    },

    isbn:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },

    quantity:{
        type:Number,
        required:true,
        min:1
    },

    availableCopies:{
        type:Number,
               required:true,
        min:0
    },

    shelf:{
        type:String,
        default:""
    }

},
{
    timestamps:true,
    versionKey:false
});

module.exports = mongoose.model("Book",bookSchema);