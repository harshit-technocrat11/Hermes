import { Request, Response } from "express";
import { successResponse } from "../../common/responses/api-response";
import * as membersService from "./members.service";

export const getWorkspaceMembers = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const slug = Array.isArray(req.params.workspaceSlug)
    ? req.params.workspaceSlug[0]
    : req.params.workspaceSlug;

  const members = await membersService.getWorkspaceMembers(slug, userId);

  return res.status(200).json(successResponse(members));
};

export const getMyWorkspaceMembership = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const slug = Array.isArray(req.params.workspaceSlug)
    ? req.params.workspaceSlug[0]
    : req.params.workspaceSlug;

  const membership = await membersService.getMyWorkspaceMembership(slug, userId);

  return res.status(200).json(successResponse(membership));
};

export const removeMember = async (req: Request, res: Response) => {
  const userId = req.user!.id;
  const slug = Array.isArray(req.params.workspaceSlug)
    ? req.params.workspaceSlug[0]
    : req.params.workspaceSlug;
  const memberId = Array.isArray(req.params.memberId)
    ? req.params.memberId[0]
    : req.params.memberId;

  await membersService.removeMember(slug, memberId, userId);

  return res.status(200).json(successResponse({ success: true }));
};