import { ObjectId } from "mongodb";
import { conn } from "../services/index.js"

const COLLECTION_NAME = 'users';

export const getUsers = async (reqQuery, res) => {
    const query = {};

    conn.getDb()
    .collection(COLLECTION_NAME)
    .find(query)
    .toArray(function (err, result) {
        if (err) {
            res.status(400).json({ success: false, message: "Error fetching users" });
        } else {
            res.status(200).json({ success: true, data: result });
        }
    });
}

export const getUser = async (username, res) => {
    const query = {
        username: username
    };

    conn.getDb()
    .collection(COLLECTION_NAME)
    .find(query)
    .toArray(function (err, result) {
        if (err) {
            res.status(400).json({ success: false, message: "Error fetching user" });
        } else if (result.length === 0) {
            res.status(404).json({ success: false, message: `Could not find user with username ${username}` });
        } else {
            res.status(200).json({ success: true, data: result[0] });
        }
    });
}

export const createUser = async (body, res) => {
    const userDocument = {
        name: body.name,
        username: body.username,
        iconUrl: body.iconUrl,
        city: body.city,
        state: body.state
    };

    conn.getDb()
    .collection(COLLECTION_NAME)
    .insertOne(userDocument, function (err, result) {
        if (err) {
            res.status(400).json({ success: false, message: "Error creating user" });
        } else {
            res.status(201).json({ success: true, id: result.insertedId });
        }
    });
}

export const updateUser = async (body, res) => {
    const query = { _id: new ObjectId(body._id) };
    delete body._id;
    const updates = {
        $set: {
            name: body.name,
            username: body.username,
            iconUrl: body.iconUrl,
            city: body.city,
            state: body.state
        }
    };
    
    conn.getDb()
    .collection(COLLECTION_NAME)
    .updateOne(query, updates, function (err, result) {
        if (err) {
            res.status(400).json({ success: false, message: `Error updating user with id ${query._id}` });
        } else {
            res.status(200).json({ success: true, message: `${result.matchedCount} document(s) matched the filter, updated ${result.modifiedCount} document(s)` });
        }
    });
}


export const deleteUser = async (id, res) => {
    const query = { _id: new ObjectId(id) };
    
    conn.getDb()
    .collection(COLLECTION_NAME)
    .deleteOne(query, function (err, result) {
        if (err) {
            res.status(400).json({ success: false, message: `Error deleting user with id ${query._id}` });
        } else {
            res.status(200).json({ success: true });
        }
    });
}