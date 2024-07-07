import express from "express";
import { pool } from "../db.js";
import { ensureAuthenticated } from "./auth.js";

const cocktailRouter = express.Router();

// Create cocktail
cocktailRouter.post("/api/create-cocktail", ensureAuthenticated, async (req, res) => {
    try {
        const { data } = req.body;

        const newCocktail = await pool.query(
            "INSERT INTO cocktails (name, category, created_by, ingredients, instructions) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [data.name, data.category, req.user.id, data.ingredients, data.instructions]
        );

        if (newCocktail.rows[0]) {
            console.log("--> New cocktail added ->\n", newCocktail.rows[0]);
            res.sendStatus(200);
        }
    } catch (err) {
        console.log(err.message);
        res.status(404).send("Something went wrong");
    }
})

// Get all cocktails
cocktailRouter.get("/api/cocktails", ensureAuthenticated, async (req, res) => {
    try {
        console.log("--> Get All Cocktails");
        const allCocktails = await pool.query("SELECT * FROM cocktails");

        res.json(allCocktails.rows);
    } catch (err) {
        console.log(err);
        res.status(404).send(`${err}`);
    }
})

// Get details of a single cocktail
cocktailRouter.get("/api/cocktails/:id", ensureAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        const cocktail = await pool.query("SELECT * FROM cocktails WHERE id = $1", [id]);
        console.log("--> Cocktail details");

        res.status(200).json(cocktail.rows);
    } catch (err) {
        console.log(err);
        res.status(404).send(`${err}`);
    }
})

// Update a cocktail
cocktailRouter.put("/api/cocktail/:id", ensureAuthenticated, async (req, res) => {
    try {
        console.log("--> Cocktail Updated");
        const { id } = req.params;
        const updateCocktail = await pool.query("UPDATE cocktails SET name = $1 WHERE id = $2", [req.body.data.name, id]);

        res.status(200).send("Update successful");
    } catch (err) {
        console.log(err);
        res.status(404).send(`${err}`);
    }
})

// Delete a cocktail
cocktailRouter.delete("/api/cocktail/:id", ensureAuthenticated, async (req, res) => {
    try {
        const { id } = req.params;
        console.log("--> Deletion", id);
        const deletedCocktail = await pool.query("DELETE FROM cocktails WHERE id = $1", [id]);

        res.status(200).send("Deletion successful");
    } catch (err) {
        console.log(err);
        res.status(404).send(`${err}`);
    }
})

export default cocktailRouter;