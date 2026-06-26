const { MongoClient } = require("mongodb");

const uri =
  "mongodb+srv://harshit562005_db_user:Harshit123@cluster0.a0dvgp7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    console.log("✅ Connected to MongoDB!");
  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
}

run();
