import { Router } from "express";
import { asyncHandler } from "../../common/utils/async-handler";
import { validate } from "../../middleware/validate.middleware";
import * as membersController from "./members.controller";
import { workspaceSlugSchema, removeMemberSchema } from "./members.schema";

// Note: Ensure `mergeParams: true` so it can access `:workspaceSlug` from the parent router.
const router = Router({ mergeParams: true });

// GET /api/v1/workspaces/:workspaceSlug/members
router.get("/", validate(workspaceSlugSchema), asyncHandler(membersController.getWorkspaceMembers));

// GET /api/v1/workspaces/:workspaceSlug/members/me
router.get("/me", validate(workspaceSlugSchema), asyncHandler(membersController.getMyWorkspaceMembership));

// DELETE /api/v1/workspaces/:workspaceSlug/members/leave
router.delete("/leave", validate(workspaceSlugSchema), asyncHandler(membersController.leaveWorkspace));

// DELETE /api/v1/workspaces/:workspaceSlug/members/:memberId
router.delete("/:memberId", validate(removeMemberSchema), asyncHandler(membersController.removeMember));

export default router;
