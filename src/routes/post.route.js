import { Router } from "express";

import { getPosts, getPost, createPost, deletePost, updatePost } from "../controllers/post.controller.js";

const POST_ROUTE = '/posts';
const postRouter = Router();

postRouter.get(POST_ROUTE, async (req, res) => {
    try {
        await getPosts(req.query, res);
    } catch (err) {
        console.log(err);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

postRouter.get(`${POST_ROUTE}/:id`, async (req, res) => {
    try {
        await getPost(req.params.id, res);
    } catch (err) {
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

postRouter.post(POST_ROUTE, async ({ body }, res) => {
    try {
        await createPost(body, res);
    } catch (err) {
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

postRouter.patch(POST_ROUTE, async ({ body }, res) => {
    try {
        await updatePost(body, res);
    } catch (err) {
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

postRouter.delete(`${POST_ROUTE}/:id`, async (req, res) => {
    try {
        await deletePost(req.params.id, res);
    } catch (err) {
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
});

export default postRouter;