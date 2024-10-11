import express from "express";
import { db } from "../index.js";

const router = express.Router();

router.post("/create-post", async (req, res) => {
  try {
    if (!req.body) {
      res.json({
        error: "Invalid request",
      });

      return;
    }

    const { title, description, user_id } = req.body;

    await db.query(
      "INSERT INTO posts (title,description,user_id) VALUES (?,?,?)",
      [title, description, user_id]
    );

    res.json({
      message: "Post created Successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: "Internal Server Error!",
    });
  }
});

// gets all posts
router.get("/", async (req, res) => {
  try {
    const [posts] = await db.query("SELECT * FROM posts");

    res.json({
      posts: posts,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: "Internal Server Error!",
    });
  }
});

// gets all posts belonging to a user with uid
router.get("/user/:uid", async (req, res) => {
  try {
    const user_id = req.params.uid;
    const [posts] = await db.query("SELECT * FROM posts WHERE user_id = ?", [
      user_id,
    ]);

    if (posts.length === 0) {
      res.json({
        error: "No posts available for this user",
      });

      return;
    }

    res.json({
      posts: posts,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: "Internal Server Error!",
    });
  }
});

// gets post of id pid
router.get("/:pid", async (req, res) => {
  try {
    const post_id = req.params.pid;
    const [posts] = await db.query("SELECT * FROM posts WHERE id = ?", [
      post_id,
    ]);

    res.json({
      post: posts[0],
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: "Internal Server Error!",
    });
  }
});

router.patch("/:pid", async (req, res) => {
  try {
    const post_id = req.params.pid;
    if (!req.body) {
      res.json({
        error: "Invalid request",
      });
      return;
    }

    const { title, description } = req.body;

    await db.query("UPDATE posts SET title = ?, description = ? WHERE id = ?", [
      title,
      description,
      post_id,
    ]);

    res.json({
      message: "Post updated successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: "Internal Server Error!",
    });
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const post_id = req.params.pid;
    if (!req.body) {
      res.json({
        error: "Invalid request",
      });
      return;
    }

    await db.query("DELETE FROM posts WHERE id = ?", [post_id]);

    res.json({
      message: "Post deleted successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: "Internal Server Error!",
    });
  }
});

export default router;

/*

GET 
POST
PUT
PATCH
DELETE

*/
