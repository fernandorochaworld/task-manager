const morgan = require('morgan');
const express = require('express');

module.exports = morganSetup = () => {
    morgan.token('req-body', (req) => JSON.stringify(req.body));

    const app = express();
    app.use(
        morgan(
            ':method :url :status :res[content-length] - :response-time ms :req-body'
        )
    );

};
