const mongoose = require("mongoose");

const issueSchema = new mongoose.Schema(
{
    member:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Member",
        required:true
    },

    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book",
        required:true
    },

    issuedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Admin",
        required:true
    },

    issueDate:{
        type:Date,
        default:Date.now
    },

    dueDate:{
        type:Date,
        required:true
    },

    returnDate:{
        type:Date
    },

    status:{
        type:String,
        enum:["Issued","Returned"],
        default:"Issued"
    }

},
{
    timestamps:true,
    versionKey:false
});

module.exports = mongoose.model("Issue",issueSchema);