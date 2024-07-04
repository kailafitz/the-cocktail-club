import { Router } from "express";
import cocktailsRouter from "./cocktails.js";
import authRouter from "./auth.js";
import userRouter from "./user.js";

const router = Router();

router.use(cocktailsRouter);
router.use(authRouter);
router.use(userRouter);

export default router;