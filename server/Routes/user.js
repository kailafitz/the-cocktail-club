import express from "express";
import { pool } from "../db.js";
import { ensureAuthenticated } from "./auth.js";

const userRouter = express.Router();

// Get user profile
userRouter.get("/api/profile", ensureAuthenticated, async (req, res) => {
    console.log("--> Profile", req.user);

    const userInfo = await pool.query("SELECT id, first_name, last_name, email, bio FROM users WHERE id = $1", [req.user.id]);
    const latestCocktails = await pool.query("SELECT * FROM cocktails WHERE created_by = $1", [req.user.id]);

    let arr = [];

    for (let i = 0; i < 3; i++) {
        if (latestCocktails.rows[i]) {
            arr.push(latestCocktails.rows[i]);
        }
    }

    // console.log(userInfo.rows[0]);

    res.status(200).send({ user: userInfo.rows[0], cocktails: arr });
});

// Set bio
userRouter.put("/api/profile/set-bio", ensureAuthenticated, async (req, res) => {
    console.log("--> Bio");

    if (req.body.data === "" || req.body.data === undefined) {
        res.status(404).send("Empty string");
    }

    await pool.query("UPDATE users SET bio = $1 WHERE id = $2", [req.body.data, req.user.id]);

    res.status(200).send("Bio updated successfully");
});

export default userRouter;