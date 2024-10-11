import express from "express";
import { db } from "../index.js";

const route = express.Router();

route.post("/create-account", async (req, res) => {
  try {
    // confirm if all relevant info is available
    if (!req.body) {
      res.json({
        error: "Please include all required field",
      });
      return;
    }

    const { first_name, last_name, password, email } = req.body;

    // confirm if user already exists
    const [usersResult] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    // if user exists, send a response saying user exists
    if (usersResult[0]) {
      res.json({
        error: `User of email ${email} already exists`,
      });
      return;
    }
    // if user does not exist, create user

    await db.query(
      "INSERT INTO users (first_name,last_name,email,password) VALUES (?,?,?,?)",
      [first_name, last_name, email, password]
    );

    //get created user account data
    const [newUserArray] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    res.json({
      message: "User created successfully!",
      user: newUserArray[0],
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: "Internal Server Error!",
    });
  }
});

route.post("/login", async (req, res) => {
  try {
    // confirm if all relevant info is available
    if (!req.body) {
      res.json({
        error: "Please include all required field",
      });
      return;
    }

    const { password, email } = req.body;

    // confirm if user exists
    const [usersResult] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    // if user does not  exist, send an error response
    if (!usersResult[0]) {
      console.log(usersResult[0]);

      res.json({
        error: `User of email ${email} does not exist`,
      });
      return;
    }

    // check whether passwords match
    if (password !== usersResult[0].password) {
      res.json({
        error: `Wrong username or password`,
      });
      return;
    }

    //get user account data
    const [UserArray] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    res.json({
      message: "Logged in successfully!",
      user: UserArray[0],
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: "Internal Server Error!",
    });
  }
});

export default route;
