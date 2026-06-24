import { Router } from "express";
import { authController } from "./auth.controller";

const router = Router();

router.get("/me", authController.getCurrentUser.bind(authController));

export default router;
