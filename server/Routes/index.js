import { Router } from "express";
import cors from "cors";
import cocktailsRouter from "./cocktails.js";
import authRouter from "./auth.js";
import userRouter from "./user.js";

const router = Router();

router.options('*', cors({
    origin: "http://localhost:3000",
    credentials: true,
    optionsSuccessStatus: 204
}))

router.use(cocktailsRouter);
router.use(authRouter);
router.use(userRouter);

export default router;