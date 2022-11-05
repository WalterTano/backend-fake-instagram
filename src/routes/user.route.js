import { Router } from "express";

import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/user.controller.js";

const USER_ROUTE = '/users';
const userRouter = Router();

userRouter.get(USER_ROUTE, async (req, res) => {
    await getUsers(req.params, res);
});

userRouter.get(`${USER_ROUTE}/:id`, async (req, res) => {
    await getUser(req.params, res);
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