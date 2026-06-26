const mongoose = require("mongoose");

const uri =
  "mongodb+srv://harshit562005_db_user:test12345@cluster0.a0dvgp7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    await mongoose.connect(uri);
    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

run();
