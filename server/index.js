import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./Routes/index.js";
import session from "express-session";
import passport from "passport";
import Redis from "ioredis";
import RedisStore from "connect-redis";
import "./testfolder/local-strategy.js";
import * as dotenv from "dotenv";
import { createTables } from "./db.js";

createTables();

const app = express();
app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN,
    credentials: true,
    optionsSuccessStatus: 204
}));
// app.use(bodyParser.urlencoded({ extended: false }));
dotenv.config();

const redis = new Redis(
    {
        host: process.env.REDIS_SERVICE_NAME,
        port: process.env.REDIS_PORT,
        connectTimeout: 5000000
    }
);

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
}

app.use(session({
    store: new RedisStore({ client: redis }),
    secret: process.env.SESSION_SECRET,
    saveUninitialized: false,
    resave: false,
    cookie: {
        secure: process.env.NODE_ENV === "development" ? false : true,
        secure: process.env.NODE_ENV === "development" ? false : true,
        maxAge: 60000 * 60000,
        sameSite: "none"
    }
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());
app.use(routes);

let PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`--> Server has started on port ${PORT}`)
});