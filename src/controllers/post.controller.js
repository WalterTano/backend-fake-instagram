import { ObjectId } from "mongodb";
import { conn } from "../services/index.js"

const COLLECTION_NAME = 'posts';

export const getPosts = async (reqQuery, res) => {
    const query = {};

    if (reqQuery.userId) {
        query.userId = new ObjectId(reqQuery.userId);
    }

    conn.getDb()
    .collection(COLLECTION_NAME)
    .find(query)
    .toArray(function (err, result) {
        if (err) {
            res.status(400).send({ success: false, message: "Error fetching posts" });
        } else {
            res.send({ success: true, data: result });
        }
    });
}

export const getPost = async (id, res) => {
    const query = {
        _id: new ObjectId(id)
    };

    conn.getDb()
    .collection(COLLECTION_NAME)
    .find(query)
    .toArray(function (err, result) {
        if (err) {
            res.status(400).send({ success: false, message: "Error fetching post" });
        } else if (result.length === 0) {
            res.status(404).send({ success: false, message: `Could not find post with id ${id}` });
        } else {
            res.send({ success: true, data: result[0] });
        }
    });
}

export const createPost = async (body, res) => {
    const postDocument = body;

    conn.getDb()
    .collection(COLLECTION_NAME)
    .insertOne(postDocument, function (err, result) {
      if (err) {
        res.status(400).send({ success: false, message: "Error creating post" });
      } else {
        res.status(204).send({ success: true, id: result.insertedId });
      }
    });
}

export const updatePost = async (body, res) => {
    const query = { _id: new ObjectId(req.body.id) };
    const updates = {
        $set: body
    };
    
    conn.getDb()
    .collection(COLLECTION_NAME)
    .updateOne(query, updates, function (err, _result) {
        if (err) {
            res.status(400).send({ success: false, message: `Error updating post with id ${query._id}` });
        } else {
            res.status(204).send({ success: true, id: result.insertedId });
        }
    });
}


export const deletePost = async (id, res) => {
    const query = { _id: new ObjectId(id) };
    
    conn.getDb()
    .collection(COLLECTION_NAME)
    .deleteOne(query, function (err, _result) {
      if (err) {
        res.status(400).send({ success: false, message: `Error deleting post with id ${query._id}` });
    } else {
        res.status(204).send({ success: true });
    }
    });
}