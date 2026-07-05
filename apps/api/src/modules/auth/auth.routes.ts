import { Router } from "express";
import passport from "passport";
import { asyncHandler } from "../../common/utils/async-handler";
import * as authController from "./auth.controller";
import { rateLimit } from "../../middleware/ratelimiter.middleware";

const router = Router();

const authLimiter = rateLimit({
  capacity: 20,
  refillRate: 1,
  message: "Too many login attempts. Please try again later.",
});

router.get(
  "/google",
  authLimiter,
  passport.authenticate("google", {
    scope: ["profile", "email"],
    session: false,
  })
);

router.get(
  "/google/callback",
  authLimiter,
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL || "http://localhost:3000"}/login`,
    session: false,
  }),
  authController.handleGoogleCallback
);

router.get("/me", asyncHandler(authController.getMe));

router.post("/logout", authController.logout);

export default router;