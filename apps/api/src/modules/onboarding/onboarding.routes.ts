import { Router } from "express";
import { asyncHandler } from "../../common/utils/async-handler";
import { validate } from "../../middleware/validate.middleware";
import { rateLimit } from "../../middleware/ratelimiter.middleware";
import { requireAuth } from "../../middleware/auth.middleware";
import { checkUsernameSchema, submitOnboardingSchema } from "./onboarding.schema";
import * as onboardingController from "./onboarding.controller";

const router = Router();

// 5 requests capacity, refilling 1 token every second
const checkUsernameLimiter = rateLimit({
  capacity: 5,
  refillRate: 1,
  message: "Too many username checks. Please slow down."
});

// Limit onboarding submissions to reduce abuse/DoS risk on authenticated write endpoint
const submitOnboardingLimiter = rateLimit({
  capacity: 3,
  refillRate: 1,
  message: "Too many onboarding submissions. Please try again shortly."
});

router.get(
  "/check-username",
  checkUsernameLimiter,
  validate(checkUsernameSchema),
  asyncHandler(onboardingController.checkUsername)
);

router.post(
  "/",
  submitOnboardingLimiter,
  requireAuth,
  validate(submitOnboardingSchema),
  asyncHandler(onboardingController.submitOnboarding)
);

export default router;
