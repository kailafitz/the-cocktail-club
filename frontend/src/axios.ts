import axios from "axios";
import { REACT_APP_BASE_URL } from "./config";
// import dotenv from "dotenv";

// dotenv.config();

export const api = axios.create({
    baseURL: REACT_APP_BASE_URL, headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": REACT_APP_BASE_URL,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS, HEAD"
    }
});

// axios.defaults.baseURL = process.env.BASE_URL;
// axios.defaults.headers.post["Content-Type"] = "application/json";