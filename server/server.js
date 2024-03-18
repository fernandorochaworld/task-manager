
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const compression = require('compression');
const cors = require('cors');
const dotenv = require('dotenv');
const { dbConnect } = require('./config/db.js');
const routers = require('./routers/routers.js');
const morganSetup = require('./utils/morgan.js');


dotenv.config();
const app = express();
const PORT = process.env.PORT;

app.use(cors());

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json()); //utilizes the body-parser package
app.use(bodyParser.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
    morganSetup();
}

// Setup Routes
app.use(routers());

try {

    (async () => {
        // Connect to database
        await dbConnect();

        // Start server listening
        if (process.env.NODE_ENV !== 'test') {
            app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));
        }
    })();

} catch (e) {
    console.log(e.message);
}

module.exports = app;