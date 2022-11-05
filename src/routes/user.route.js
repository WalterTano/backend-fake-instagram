import { Router } from "express";

import { getUsers, getUser, createUser, deleteUser, updateUser } from "../controllers/user.controller.js";

const USER_ROUTE = '/users';
const userRouter = Router();

userRouter.get(USER_ROUTE, async (req, res) => {
    await getUsers(req.query, res);
});

userRouter.get(`${USER_ROUTE}/:id`, async (req, res) => {
    await getUser(req.params.id, res);
});

userRouter.post(USER_ROUTE, async (req, res) => {
    await createUser(req.body, res);
});

userRouter.patch(USER_ROUTE, async (req, res) => {
    await updateUser(req.body, res);
});

userRouter.delete(`${USER_ROUTE}/:id`, async (req, res) => {
    await deleteUser(req.params.id, res);
});

export default userRouter;