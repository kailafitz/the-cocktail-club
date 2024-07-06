import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

export const api = axios.create({
    baseURL: process.env.BASE_URL
});

// axios.defaults.baseURL = process.env.BASE_URL;
// axios.defaults.headers.post["Content-Type"] = "application/json";