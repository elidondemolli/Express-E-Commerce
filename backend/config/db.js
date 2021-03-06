const mongoose = require('mongoose');
require('dotenv').config()

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });

        console.log('MongoDB Connected...')
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

module.exports = connectDB;