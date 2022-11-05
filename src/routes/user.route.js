import { Router } from "express";

import { getUsers, getUser, createUser, deleteUser, updateUser } from "../controllers/user.controller.js";

const USER_ROUTE = '/users';
const userRouter = Router();

userRouter.get(USER_ROUTE, async (req, res) => {
    try {
        await getUsers(req.query, res);
    } catch (err) {
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

userRouter.get(`${USER_ROUTE}/:username`, async (req, res) => {
    try {
        await getUser(req.params.username, res);
    } catch (err) {
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

userRouter.post(USER_ROUTE, async ({ body }, res) => {
    try {
        await createUser(body, res);
    } catch (err) {
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

userRouter.patch(USER_ROUTE, async ({ body }, res) => {
    try {
        await updateUser(body, res);
    } catch (err) {
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

userRouter.delete(`${USER_ROUTE}/:id`, async (req, res) => {
    try {
        await deleteUser(req.params.id, res);
    } catch (err) {
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

export default userRouter;