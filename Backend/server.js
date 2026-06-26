require("dotenv").config();
const app = require("./src/app");
const connectDB = require("./src/db/db");
console.log("MONGODB_URI =", process.env.MONGODB_URI);
console.log(
  "Starts with mongodb+srv:// ?",
  process.env.MONGODB_URI?.startsWith("mongodb+srv://"),
);

connectDB();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
