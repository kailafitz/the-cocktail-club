import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./Routes/index.js";
import session from "express-session";
import passport from "passport";
import "./strategies/local-strategy.js";
// import Client from "pg/lib/client.js";
import * as dotenv from "dotenv";

const app = express();
// app.use(bodyParser.urlencoded({ extended: false }));

// middleware
dotenv.config();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));
app.use(express.json());
app.use(session({
    secret: "something very secreteive",
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: 60000 * 60000,
        secure: false,
    }
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

app.listen(5001, () => {
    console.log("----> Server has started on port 5001")
});