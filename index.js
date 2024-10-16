import cors from "cors";
import "dotenv/config";
import express from "express";
import mysql from "mysql2/promise";
import authRoute from "./routes/auth.route.js";
import postsRoute from "./routes/posts.route.js";

const PORT = 3000;
const DB_PASSWORD = process.env.DB_PASSWORD;

const app = express();
app.use(express.json()); //parse json requests
app.use(cors()); // enable cross origin resource sharing
app.use("/auth", authRoute);
app.use("/posts", postsRoute);

app.listen(PORT, () => {
  console.log(`CCB Server is running at port ${PORT}`);
});

export const db = await mysql.createConnection({
  user: "root",
  database: "blog_app",
  password: DB_PASSWORD,
});

console.log("Connected to DB");
