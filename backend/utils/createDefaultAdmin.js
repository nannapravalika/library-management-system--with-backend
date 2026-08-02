const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");

const createDefaultAdmin = async () => {
    try {
        const adminExists = await Admin.findOne({
            email: "admin@library.com"
        });

        if (adminExists) {
            console.log("✅ Default admin already exists.");
            return;
        }

        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        await Admin.create({
            name: "Library Admin",
            email: "admin@library.com",
            password: hashedPassword,
            role: "admin"
        });

        console.log("✅ Default Admin Created");
        console.log("Email: admin@library.com");
        console.log("Password: Admin@123");

    } catch (error) {
        console.log(error.message);
    }
};

module.exports = createDefaultAdmin;