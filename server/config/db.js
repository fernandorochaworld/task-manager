const mongoose = require('mongoose');
require('dotenv').config();

const dbConnect = async () => {
    const mongoUrl = process.env.NODE_ENV === 'test' ? process.env.MONGO_URL_TEST : process.env.MONGO_URL;
    
    await mongoose.connect(mongoUrl).then(null, error => {
        console.log(error);
        throw new 'Connection Error.';
    });

    const connection = mongoose.connection;
    if (connection.readyState >= 1) {
        console.log("Connected to database");
        return;
    }
    connection.on('error', () => { throw new ('Connection failed') });
}

const closeConnection = async () => {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.log('Error closing connection: ', error)
    }
}

module.exports = { dbConnect, closeConnection };