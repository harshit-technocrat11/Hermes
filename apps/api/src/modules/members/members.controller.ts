import { Response } from "express";
import { AuthRequest } from "../../middleware/auth.middleware";
import { successResponse } from "../../common/responses/api-response";
import * as membersService from "./members.service";

export const getWorkspaceMembers = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const slug = req.params.workspaceSlug as string;

  const members = await membersService.getWorkspaceMembers(slug, userId);

  return res.status(200).json(successResponse(members));
};

export const getMyWorkspaceMembership = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const slug = req.params.workspaceSlug as string;

  const membership = await membersService.getMyWorkspaceMembership(slug, userId);

  return res.status(200).json(successResponse(membership));
};

export const removeMember = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const slug = req.params.workspaceSlug as string;
  const memberId = req.params.memberId as string;

  await membersService.removeMember(slug, memberId, userId);

  return res.status(200).json(successResponse({ success: true }));
};

export const leaveWorkspace = async (req: AuthRequest, res: Response) => {
  const userId = req.user!.id;
  const slug = req.params.workspaceSlug as string;

  await membersService.leaveWorkspace(slug, userId);

  return res.status(200).json(successResponse({ success: true }));
};