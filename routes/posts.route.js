import express from "express";
import { db } from "../index.js";

const router = express.Router();

router.post("/create-post", async (req, res) => {
  if (!req.body) {
    res.json({
      error: "Invalid request",
    });

    return;
  }

  const { title, description } = req.body;

  await db.query("INSERT INTO posts (title,description) VALUES (?,?)", [
    title,
    description,
  ]);

  res.json({
    message: "Post created Successfully!",
  });
});

export default router;
