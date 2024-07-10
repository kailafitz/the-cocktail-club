import express from "express";
import { pool } from "../db.js";
import { ensureAuthenticated } from "./auth.js";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers";
import { Upload } from "@aws-sdk/lib-storage";

const client = new S3Client({
    region: "us-east-1",
    credentials: fromCognitoIdentityPool({
        clientConfig: { region: process.env.S3_REGION },
        identityPoolId: process.env.S3_IDENTITY_POOL_ID,
    }),
});

const cocktailRouter = express.Router();

// Create cocktail
cocktailRouter.post("/api/create-cocktail", ensureAuthenticated, async (req, res) => {
    try {
        const { data } = req.body;

        const command = new PutObjectCommand({
            Bucket: process.env.S3_BUCKET_NAME,
            Key: req.user.id.toString(),
            Body: req.body.img,
        });

        const response = await client.send(command);
        console.log("data", data, response);

        const newCocktail = await pool.query(
            "INSERT INTO cocktails (name, category, created_by, ingredients, instructions) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [data.name, data.category, req.user.id, data.ingredients, data.instructions]
        );

        if (newCocktail.rows[0]) {
            console.log("--> New cocktail added ->\n", newCocktail.rows[0]);
            res.status(200).send("Success");
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
        const allCocktails = await pool.query("SELECT * FROM cocktails WHERE created_by = $1", [req.user.id]);

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
        const user = await pool.query("SELECT first_name, last_name FROM users WHERE id = $1", [cocktail.rows[0].created_by]);
        console.log("--> Cocktail details", user.rows[0]);

        res.status(200).send({ cocktail: cocktail.rows, user: user.rows[0] })
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