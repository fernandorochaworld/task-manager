
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnect } from './config/db.js';
import routers from './routers/routers.js';
// import mongoose from 'mongoose';
// import router from './router';

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

// console.log('port', PORT, 'MONGO', MONGO_URL);

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(bodyParser.json()); //utilizes the body-parser package
app.use(bodyParser.urlencoded({ extended: true }));

try {
    await dbConnect();

    app.use('/api', routers());
    app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
} catch (e) {
    // console.log(e.message);
}

// mongoose.Promise = Promise;
// mongoose.connect(MONGO_URL);
// mongoose.connection.on('error', (error) => {console.log(error)})

