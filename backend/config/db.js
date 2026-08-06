const mongoose = require("mongoose");

const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGO_URI);

        console.log("======================================");
        console.log("MongoDB Connected Successfully");
        console.log(`Database : ${conn.connection.name}`);
        console.log(`Host     : ${conn.connection.host}`);
        console.log("======================================");

    }

    catch (error) {

        console.log("======================================");
        console.log("MongoDB Connection Failed");
        console.log(error.message);
        console.log("======================================");

        process.exit(1);

    }

};

module.exports = connectDB;