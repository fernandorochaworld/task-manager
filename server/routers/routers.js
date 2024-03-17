const express = require("express");
const taskRouter = require("./task-router.js");
const loginRouter = require("./login-router.js");
const tasklistRouter = require("./task-list-router.js");
const personRouter = require("./person-router.js");

const router = express.Router();

module.exports = () => {
    router.use('/api/login', loginRouter);
    router.use('/api/person', personRouter);
    router.use('/api/person', tasklistRouter);
    router.use('/api/person', taskRouter);

    router.all('*', (req, res) => {
        return res.status(404).json({ message: 'Service not found.' }).end();
    });
    return router;
};
