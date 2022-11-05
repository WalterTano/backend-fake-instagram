import { conn } from "../services/index.js"

const COLLECTION_NAME = 'users';

export const getUsers = async (params, res) => {
    const query = {};

    conn.getDb()
    .collection(COLLECTION_NAME)
    .find(query)
    .toArray(function (err, result) {
        if (err) {
            res.status(400).send({ success: false, message: "Error fetching users" });
        } else {
            res.send({ success: true, data: result });
        }
    });
}

export const getUser = async (id, res) => {
    const query = {
        _id: id
    };

    conn.getDb()
    .collection(COLLECTION_NAME)
    .find(query)
    .toArray(function (err, result) {
        if (err) {
            res.status(400).send({ success: false, message: "Error fetching user" });
        } else if (result.length === 0) {
            res.status(404).send({ success: false, message: `Could not find user with id ${id}` });
        } else {
            res.send({ success: true, data: result[0] });
        }
    });
}

export const createUser = async (body, res) => {
    const userDocument = body;

    conn.getDb()
    .collection(COLLECTION_NAME)
    .insertOne(userDocument, function (err, result) {
      if (err) {
        res.status(400).send({ success: false, message: "Error creating user" });
      } else {
        res.status(204).send({ success: true, id: result.insertedId });
      }
    });
}

export const updateUser = async (body, res) => {
    const query = { _id: req.body.id };
    const updates = {
        $set: body
    };
    
    conn.getDb()
    .collection(COLLECTION_NAME)
    .updateOne(listingQuery, updates, function (err, _result) {
        if (err) {
            res.status(400).send({ success: false, message: `Error updating user with id ${query._id}` });
        } else {
            res.status(204).send({ success: true, id: result.insertedId });
        }
    });
}


export const deleteUser = async (id, res) => {
    const query = { _id: id };
    
    conn.getDb()
    .collection(COLLECTION_NAME)
    .deleteOne(query, function (err, _result) {
      if (err) {
        res.status(400).send({ success: false, message: `Error deleting user with id ${query._id}` });
    } else {
        res.status(204).send({ success: true });
    }
    });
}