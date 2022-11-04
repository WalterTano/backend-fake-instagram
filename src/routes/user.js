import { Router } from "express";

const userRouter = Router();

userRouter.get('/user', (req, res) => { res.send('user endpoint') });

export default userRouter;