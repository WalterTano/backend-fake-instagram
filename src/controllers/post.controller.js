import { ObjectId } from "mongodb";
import { conn } from "../services/index.js"

const COLLECTION_NAME = 'posts';
const DEFAULT_SEP = ';';
const INCLUDE_USER_AGGREGATE_QUERY = [
    { $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user"
        }
    },
    { $unwind: { path: "$user"  } },
    { $project: { userId: 0 } }
];

export const getPosts = async (reqQuery, res) => {
    const handleQueryResult = (err, result) => {
        if (err) {
            res.status(400).json({ success: false, message: "Error fetching posts" });
        } else {
            res.status(200).json({ success: true, data: result });
        }
    };
    
    const query = {};

    if (reqQuery.userId) {
        query.userId = new ObjectId(reqQuery.userId);
    }

    if (reqQuery.q) {
        const tags = reqQuery.q.split(DEFAULT_SEP);
        query.tags = { $in: tags };
    }

    if (reqQuery.includeUser === 'true' || reqQuery.includeUser === true) {
        conn.getDb()
        .collection(COLLECTION_NAME)
        .aggregate(INCLUDE_USER_AGGREGATE_QUERY)
        .toArray(handleQueryResult);
    } else {
        conn.getDb()
        .collection(COLLECTION_NAME)
        .find(query)
        .toArray(handleQueryResult);
    }
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
            res.status(400).json({ success: false, message: "Error fetching post" });
        } else if (result.length === 0) {
            res.status(404).json({ success: false, message: `Could not find post with id ${id}` });
        } else {
            res.status(200).json({ success: true, data: result[0] });
        }
    });
}

export const createPost = async (body, res) => {
    const postDocument = {
        postImg: {
            id: body.postImg.id,
            url: body.postImg.url,
            altText: body.postImg.altText
        },
        tags: body.tags
    };
    if (body.user) {
        updates.$set.userId = new ObjectId(body.user._id);
    } else {
        updates.$set.userId = new ObjectId(body.userId);
    }

    conn.getDb()
    .collection(COLLECTION_NAME)
    .insertOne(postDocument, function (err, result) {
        if (err) {
            res.status(400).json({ success: false, message: "Error creating post" });
        } else {
            res.status(201).json({ success: true, id: result.insertedId });
        }
    });
}

export const updatePost = async (body, res) => {
    const query = { _id: new ObjectId(body._id) };
    delete body._id;
    const updates = {
        $set: {
            postImg: {
                id: body.postImg.id,
                url: body.postImg.url,
                altText: body.postImg.altText
            },
            tags: body.tags
        }
    };
    if (body.user) {
        updates.$set.userId = new ObjectId(body.user._id);
    } else {
        updates.$set.userId = new ObjectId(body.userId);
    }

    conn.getDb()
    .collection(COLLECTION_NAME)
    .updateOne(query, updates, function (err, result) {
        if (err) {
            res.status(400).json({ success: false, message: `Error updating post with id ${query._id}` });
        } else {
            res.status(200).json({ success: true, message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)` });
        }
    });
}


export const deletePost = async (id, res) => {
    const query = { _id: new ObjectId(id) };
    
    conn.getDb()
    .collection(COLLECTION_NAME)
    .deleteOne(query, function (err, result) {
        if (err) {
            res.status(400).json({ success: false, message: `Error deleting post with id ${query._id}` });
        } else {
            res.status(200).json({ success: true });
        }
    });
}