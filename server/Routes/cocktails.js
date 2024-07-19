import express from "express";
import { pool } from "../db.js";
import { ensureAuthenticated } from "./auth.js";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner"; // Private bucket
import { fromCognitoIdentityPool } from "@aws-sdk/credential-providers"; // Public bucket
import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import multer from "multer";
import crypto from "crypto";

const cocktailRouter = express.Router();

let s3Config = { region: process.env.S3_REGION, credentials: fromCognitoIdentityPool({ clientConfig: { region: process.env.S3_REGION }, identityPoolId: process.env.S3_IDENTITY_POOL_ID }) } // Public bucket
// let s3Config = { region: process.env.S3_REGION, credentials: { accessKeyId: process.env.S3_ACCESS_KEY, secretAccessKey: process.env.S3_SECRET_ACCESS_KEY } } // Private bucket
const client = new S3Client(s3Config);

// Create a storage strategy for multer
const storage = multer.memoryStorage();
// Create a multer instance with the storage strategy
const upload = multer({ storage: storage });

const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");

const getFileExtension = (fileName) => {
    let breakdown = fileName.split(".");

    return `.${breakdown[breakdown.length - 1]}`
}

export function uploadFile(fileName, fileBuffer, mimetype) {
    const params = {
        Bucket: process.env.S3_BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        contentType: mimetype
    }

    return client.send(new PutObjectCommand(params));
}

// Create cocktail
cocktailRouter.post("/api/create-cocktail", ensureAuthenticated, upload.single("data[imageFile]"), async (req, res) => {
    try {
        const { data } = req.body;

        let fileType = getFileExtension(req.file.originalname);
        const imageName = `${randomImageName()}${fileType}`;

        uploadFile(imageName, req.file.buffer, req.file.mimetype);

        const imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${imageName}`;

        const newCocktail = await pool.query(
            "INSERT INTO cocktails (name, category, created_by, ingredients, instructions, image_name, image_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            [data.name, data.category, req.user.id, data.ingredients, data.instructions, imageName, imageUrl]
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
        // console.log("--> Cocktail details", user.rows[0]);

        res.status(200).send({ cocktail: cocktail.rows, user: user.rows[0] })
    } catch (err) {
        console.log(err);
        res.status(404).send(`${err}`);
    }
})

// Update a cocktail
cocktailRouter.put("/api/cocktail/:id", ensureAuthenticated, upload.single("data[imageFile]"), async (req, res) => {
    try {
        const { data } = req.body;
        const { id } = req.params;
        // console.log(req.body, req.file);

        let fileType;
        let imageName;
        let imageUrl;

        if (req.file !== undefined) {
            console.log("File is present");
            const cocktail = await pool.query("SELECT * FROM cocktails WHERE id = $1", [id]);
            console.log(cocktail.rows[0]);
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: cocktail.rows[0].image_name
            }
            const command = new DeleteObjectCommand(params);
            await client.send(command);

            fileType = getFileExtension(req.file.originalname);
            imageName = `${randomImageName()}${fileType}`;
            uploadFile(imageName, req.file.buffer, req.file.mimetype);
            imageUrl = `https://${process.env.S3_BUCKET_NAME}.s3.amazonaws.com/${imageName}`;
        }

        let values = [id, data.name, data.category, data.ingredients, data.instructions]
        let valuesWithImage = [...values, imageName, imageUrl]

        const updatedCocktail = await pool.query(`UPDATE cocktails SET name = $2, category = $3, ingredients = $4, instructions = $5 ${req.file !== undefined ? ", image_name = $6, image_url = $7" : ""} WHERE id = $1 RETURNING *`, req.file !== undefined ? valuesWithImage : values);

        console.log("--> Cocktail Updated", updatedCocktail.rows);
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
        const cocktail = await pool.query("SELECT * FROM cocktails WHERE id = $1", [id]);
        console.log(cocktail.rows[0]);
        if (!cocktail.rows[0]) {
            res.status(404).send("Cocktail not found!");
        }
        else {
            const params = {
                Bucket: process.env.S3_BUCKET_NAME,
                Key: cocktail.rows[0].image_name
            }
            const command = new DeleteObjectCommand(params);
            await client.send(command);
        }

        await pool.query("DELETE FROM cocktails WHERE id = $1", [id]);
        console.log("--> Deletion", id);

        res.status(200).send("Deletion successful");
    } catch (err) {
        console.log(err);
        res.status(404).send(`${err}`);
    }
})

export default cocktailRouter;