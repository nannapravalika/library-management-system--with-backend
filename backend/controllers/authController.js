const jwt = require("jsonwebtoken");

const Admin = require("../models/Admin");

exports.login = async (req,res)=>{

    try{

        const {email,password}=req.body;

        if(!email || !password){

            return res.status(400).json({
                success:false,
                message:"Email and Password are required"
            });

        }

        const admin = await Admin.findOne({email}).select("+password");

        if(!admin){

            return res.status(401).json({
                success:false,
                message:"Invalid Email"
            });

        }

        const isMatch = await admin.matchPassword(password);

        if(!isMatch){

            return res.status(401).json({
                success:false,
                message:"Invalid Password"
            });

        }

        const token = jwt.sign(
        {
            id:admin._id,
            role:admin.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn:"1d"
        });

        res.status(200).json({

            success:true,
            message:"Login Successful",

            token,

            admin:{
                id:admin._id,
                name:admin.name,
                email:admin.email,
                role:admin.role
            }

        });

    }

    catch(error){

        res.status(500).json({

            success:false,
            message:error.message

        });

    }

};