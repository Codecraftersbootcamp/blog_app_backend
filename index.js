import cors from "cors";
import express from "express";
import mysql from "mysql2/promise";
import authRoute from "./routes/auth.route.js";

const PORT = 3000;

const app = express();
app.use(express.json()); //parse json requests
app.use(cors()); // enable cross origin resource sharing
app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`CCB Server is running at port ${PORT}`);
});

export const db = await mysql.createConnection({
  user: "root",
  database: "blog_app",
  password: "Wizardblack@mysql",
});

console.log("Connected to DB");
