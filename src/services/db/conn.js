import { MongoClient } from "mongodb";

let dbConnection;

export const conn = {
  connectToServer: function (callback) {
    const connectionString = process.env.ATLAS_URI;
    const dbName = process.env.DB_NAME;
    
    const client = new MongoClient(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    client.connect()
    .then((db) => {
        if (!db) {
            return;
        }

        dbConnection = db.db(dbName);
        console.log("Successfully connected to MongoDB.");
        callback();
    })
    .catch(err => {
      console.log(err);
    });
  },

  getDb: function () {
    return dbConnection;
  },
};