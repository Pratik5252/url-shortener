import mongoose from "mongoose";

type ConnectionObj = {
  isConnected?: number;
};

const connection: ConnectionObj = {};

async function dbConnection(): Promise<void> {
  if (connection.isConnected) {
    console.log("Already Connected to Database");
    return;
  }

  try {
    const db = await mongoose.connect(process.env.MONGODB_URI || "", {
      dbName: "urlshortener",
    });
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected");
  } catch (error) {
    console.log("Connection failed ", error);

    process.exit(1);
  }
}

export default dbConnection;
