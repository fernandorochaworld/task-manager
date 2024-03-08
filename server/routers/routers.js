import express from "express";
import taskRouter from "./task-router.js";
import loginRouter from "./login.js";
import tasklistRouter from "./task-list-router.js";
import personRouter from "./person-router.js";

const router = express.Router();

export default () => {
    router.use('/api/login', loginRouter);
    router.use('/api/person', personRouter);
    router.use('/api/task-list', tasklistRouter);
    router.use('/api/task', taskRouter);

    router.all('*', (req, res) => {
        return res.status(404).json({ message: 'Service not found.' }).end();
    });
    return router;
};
