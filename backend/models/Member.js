const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
{
    memberId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        uppercase:true
    },

    name:{
        type:String,
        required:true,
        trim:true
    },

    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match:[/^\S+@\S+\.\S+$/,"Please enter a valid email"]
    },

    phone:{
        type:String,
        required:true,
        match:[/^[6-9]\d{9}$/,"Enter valid mobile number"]
    },

    address:{
        type:String,
        required:true,
        trim:true
    },

    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active"
    }

},
{
    timestamps:true,
    versionKey:false
});

module.exports = mongoose.model("Member",memberSchema);