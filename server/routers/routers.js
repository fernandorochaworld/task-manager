import express from "express";
import taskRouter from "./task-router";
import loginRouter from "./login";

const router = express.Router();

export default () => {
    router.use('/api/login', loginRouter);
    router.use('/api/person', personRou);
    router.use('/api/login', taskRouter);

    router.all('*', (req, res) => {
        return res.status(404).json({ message: 'Service not found.' }).end();
    });
    return router;
};
