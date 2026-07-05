import { Router } from "express";

import { asyncHandler } from "../../common/utils/async-handler";
import { validate } from "../../middleware/validate.middleware";
import { requireAuth } from "../../middleware/auth.middleware";

import * as workspaceController from "./workspace.controller";
import {
  createWorkspaceSchema,
  joinWorkspaceSchema,
  updateWorkspaceSchema,
  slugParamSchema,
} from "./workspace.schema";

const router = Router();

// All workspace routes require authentication
router.use(requireAuth);

// ── Create a new workspace ────────────────────────────────────────────────────
// POST /api/v1/workspaces
router.post(
  "/",
  validate(createWorkspaceSchema),
  asyncHandler(workspaceController.createWorkspace),
);

// ── List all workspaces the authenticated user belongs to ─────────────────────
// GET /api/v1/workspaces
router.get("/", asyncHandler(workspaceController.getMyWorkspaces));

// ── Join a workspace via invite code ──────────────────────────────────────────
// POST /api/v1/workspaces/join
// NOTE: must be registered BEFORE /:slug to avoid "join" being treated as a slug
router.post(
  "/join",
  validate(joinWorkspaceSchema),
  asyncHandler(workspaceController.joinWorkspace),
);

// ── Get a single workspace by slug (membership verified) ─────────────────────
// GET /api/v1/workspaces/:slug
router.get(
  "/:slug",
  validate(slugParamSchema),
  asyncHandler(workspaceController.getWorkspace),
);

// ── List all members of a workspace ──────────────────────────────────────────
// GET /api/v1/workspaces/:slug/members
router.get(
  "/:slug/members",
  validate(slugParamSchema),
  asyncHandler(workspaceController.getWorkspaceMembers),
);

// ── Update workspace name / iconUrl (OWNER / ADMIN only) ─────────────────────
// PATCH /api/v1/workspaces/:slug
router.patch(
  "/:slug",
  validate(updateWorkspaceSchema),
  asyncHandler(workspaceController.updateWorkspace),
);

// ── Regenerate invite code (OWNER / ADMIN only) ───────────────────────────────
// POST /api/v1/workspaces/:slug/invite/regenerate
router.post(
  "/:slug/invite/regenerate",
  validate(slugParamSchema),
  asyncHandler(workspaceController.regenerateInviteCode),
);

export default router;
