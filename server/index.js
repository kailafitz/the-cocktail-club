import express from "express";
// import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./Routes/index.js";
import session from "express-session";
import passport from "passport";
import Redis from "ioredis";
import RedisStore from "connect-redis";
// import connectRedis from "connect-redis";
import "./testfolder/local-strategy.js";
import * as dotenv from "dotenv";

const app = express();
app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: false }));

// const RedisStore = connectRedis(session);

dotenv.config();
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
}));

const redis = new Redis(
    {
        host: process.env.REDIS_SERVICE_NAME,
        port: process.env.REDIS_PORT,
        connectTimeout: 5000000
    }
);

app.use(session({
    store: new RedisStore({ client: redis }),
    secret: process.env.SESSION_SECRET,
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

let PORT = process.env.PORT;

// console.log("--> Process Env", process.env.SESSION_SECRET);

app.listen(PORT, () => {
    console.log("--> Server has started on port 5001")
});