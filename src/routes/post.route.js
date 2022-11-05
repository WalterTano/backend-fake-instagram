import { Router } from "express";

import { getPosts, getPost, createPost, deletePost, updatePost } from "../controllers/post.controller.js";

const POST_ROUTE = '/posts';
const postRouter = Router();

postRouter.get(POST_ROUTE, async (req, res) => {
    await getPosts(req.query, res);
});

postRouter.get(`${POST_ROUTE}/:id`, async (req, res) => {
    await getPost(req.params.id, res);
});

postRouter.post(POST_ROUTE, async (req, res) => {
    await createPost(req.body, res);
});

postRouter.patch(POST_ROUTE, async (req, res) => {
    await updatePost(req.body, res);
});

postRouter.delete(`${POST_ROUTE}/:id`, async (req, res) => {
    await deletePost(req.params.id, res);
});

export default postRouter;