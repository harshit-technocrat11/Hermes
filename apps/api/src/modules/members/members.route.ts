import { Router } from "express";
import { asyncHandler } from "../../common/utils/async-handler";
import { requireAuth } from "../../middleware/auth.middleware";
import * as membersController from "./members.controller";

// Note: Ensure `mergeParams: true` so it can access `:workspaceSlug` from the parent router.
const router = Router({ mergeParams: true });

router.use(requireAuth);

// GET /api/v1/workspaces/:workspaceSlug/members
router.get("/", asyncHandler(membersController.getWorkspaceMembers));

// GET /api/v1/workspaces/:workspaceSlug/members/me
router.get("/me", asyncHandler(membersController.getMyWorkspaceMembership));

// DELETE /api/v1/workspaces/:workspaceSlug/members/:memberId
router.delete("/:memberId", asyncHandler(membersController.removeMember));

export default router;
