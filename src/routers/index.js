import authRouter from "./auth.router.js";
import { Router } from "express";

const router = Router();

router.use("/auth", authRouter);
router.use("/users", (req, res) => {
  res.send("Users");
});
export default router;
