import { Router } from "express";
import { register, login, getCurrentUser } from "../controllers/index.js";
import { validate, authenticateToken } from "../middlewares/index.js";
import { registerSchema, loginSchema } from "../validations/index.js";

const authRouter = Router();

authRouter.post("/register", validate(registerSchema), register);
authRouter.post("/login", validate(loginSchema), login);
authRouter.get("/me", authenticateToken, getCurrentUser);

export default authRouter;
