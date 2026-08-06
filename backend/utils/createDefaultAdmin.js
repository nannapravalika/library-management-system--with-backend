const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

const createDefaultAdmin = async () => {

    try {

        const adminExists = await Admin.findOne({
            email: process.env.ADMIN_EMAIL
        });

        if (adminExists) {

            console.log("Admin Already Exists");
            return;

        }

        const hashedPassword = await bcrypt.hash(
            process.env.ADMIN_PASSWORD,
            10
        );

        await Admin.create({

            name: process.env.ADMIN_NAME,
            email: process.env.ADMIN_EMAIL,
            password: hashedPassword,
            role: "admin"

        });

        console.log("Default Admin Created");

    }

    catch (error) {

        console.error("Error Creating Default Admin");
        console.error(error.message);

    }

};

module.exports = createDefaultAdmin;