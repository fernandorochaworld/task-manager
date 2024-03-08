import mongoose from 'mongoose';

export const dbConnect = async () => {
    await mongoose.connect(process.env.MONGO_URL).then(null, error => {
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

export const closeConnection = async () => {
    try {
        await mongoose.connection.close();
    } catch (error) {
        console.log('Error closing connection: ', error)
    }
}
