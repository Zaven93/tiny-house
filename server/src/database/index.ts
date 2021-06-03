import "dotenv/config";
import { MongoClient } from "mongodb";
import { Database } from "../lib/types";

export const connectDB = async (): Promise<Database> => {
  const client = await MongoClient.connect(`${process.env.DB_URL}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = client.db("main");
  console.log("Successfully connected to DB");
  return {
    listings: db.collection("listings"),
  };
};
