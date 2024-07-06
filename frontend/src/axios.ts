import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

export const api = axios.create({
    baseURL: "http://localhost:5001", headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD"
    }
});

// axios.defaults.baseURL = process.env.BASE_URL;
// axios.defaults.headers.post["Content-Type"] = "application/json";