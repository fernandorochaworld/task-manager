
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnect } from './config/db.js';
import routers from './routers/routers.js';
import { morganSetup } from './utils/morgan.js'


dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json()); //utilizes the body-parser package
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  morganSetup();
}


try {
    await dbConnect();

    app.use(routers());
    app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
} catch (e) {
    console.log(e.message);
}
