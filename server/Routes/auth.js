import express from "express";
import passport from "passport";
import { pool } from "../db.js";
import { hashPassword } from "../Helpers/hash-password.js"

const authRouter = express.Router();

// Sign up user
authRouter.post("/api/sign-up", async (req, res) => {
    console.log("--> Signup Endpoint");
    try {
        const { firstName, lastName, email, password, confirmPassword } = req.body;
        console.log("Sign up user body", req.body);

        const findUser = await pool.query(
            "SELECT email FROM users WHERE email = $1",
            [email]
        );

        if (findUser.rows.length >= 1) {
            return res.status(404).send("User already exists");
        }
        else if (password !== confirmPassword) {
            return res.status(404).send("Passwords do not match");
        }
        else {
            const newUser = await pool.query(
                "INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)",
                [firstName, lastName, email, hashPassword(password)]
            );

            const findNewUser = await pool.query("SELECT id, email FROM users WHERE email = $1", [email]);
            console.log(findNewUser.rows[0]);

            req.login(findNewUser.rows[0], function (err) {
                if (err) {
                    return res.status(400).send("Registration and login unsuccessful!");
                }
                return res.status(200).send("Registration and login successful!");
            });
        }
    }
    catch (err) {
        return res.status(404).send(`${err}`);
    }
})

// Protected routes (backend)
export const ensureAuthenticated = (req, res, next) => {
    console.log("--> Ensure Authentication", req.isAuthenticated());
    if (req.isAuthenticated()) {
        console.log("--> Is authentication");
        return next();
    }
    res.status(401).send("Unauthorised");
    // res.redirect("/login");
}

authRouter.get("/api/login/status", (req, res) => {
    console.log("--> Status Endpoint req.user", req.user);
    if (req.user) {
        return res.status(200).send(true);
        // return res.send(true);
    }
    else {
        return res.status(200).send(false);
        // return res.send(false);
    }
})

// Login user with passport
// authRouter.post("/api/login", passport.authenticate("local", { failureRedirect: "/login", failureMessage: "true" }), (req, res) => {
//     console.log("--> Login Endpoint");
//     return res.status(200).send(req.user);
// })

authRouter.post("/api/login", (req, res, next) => {
    passport.authenticate("local", function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.status(401).json(info.message); }
        req.logIn(user, function (err) {
            if (err) { return next(err); }
            return res.status(200).send("Login successful");
        });
    })(req, res, next);
})

authRouter.post("/api/logout", (req, res) => {
    console.log("--> Logout", req.user);

    if (!req.user) {
        return res.status(401).send("User not found to log out");
    }

    req.logout((err) => {
        if (err) {
            return res.status(400).send("Unable to logout due to an error");
        }
        return res.status(200).send("Logout successful");
    })
});

export default authRouter;