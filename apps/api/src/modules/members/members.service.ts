import { Role } from "@prisma/client";
import { AppError } from "../../common/errors/app-error";
import { ErrorCode } from "../../common/errors/error-codes";
import prisma from "../../lib/prisma";

export async function getWorkspaceMembers(workspaceSlug: string, userId: string) {
  const workspace = await prisma.workspace.findUnique({
    where: { slug: workspaceSlug },
  });

  if (!workspace) {
    throw new AppError(404, "WORKSPACE_NOT_FOUND");
  }

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId: workspace.id,
      },
    },
  });

  if (!membership) {
    throw new AppError(403, ErrorCode.FORBIDDEN);
  }

  const members = await prisma.workspaceMember.findMany({
    where: { workspaceId: workspace.id },
    include: { user: true },
    orderBy: { createdAt: "asc" },
  });

  return members.map(({ user, role, createdAt, id }) => ({
    id, // WorkspaceMember id or User id? The instructions say: "id, userId, name, email, image, role, joinedAt". 
    // Let's use WorkspaceMember.id for the member record ID and user.id for userId
    userId: user.id,
    name: user.name,
    email: user.email,
    image: user.imageUrl,
    role,
    joinedAt: createdAt,
  }));
}

export async function getMyWorkspaceMembership(workspaceSlug: string, userId: string) {
  const workspace = await prisma.workspace.findUnique({
    where: { slug: workspaceSlug },
  });

  if (!workspace) {
    throw new AppError(404, "WORKSPACE_NOT_FOUND");
  }

  const membership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId,
        workspaceId: workspace.id,
      },
    },
  });

  if (!membership) {
    throw new AppError(403, ErrorCode.FORBIDDEN);
  }

  return {
    workspaceId: workspace.id,
    userId: membership.userId,
    role: membership.role,
    joinedAt: membership.createdAt,
  };
}

export async function removeMember(workspaceSlug: string, memberId: string, requesterUserId: string) {
  const workspace = await prisma.workspace.findUnique({
    where: { slug: workspaceSlug },
  });

  if (!workspace) {
    throw new AppError(404, "WORKSPACE_NOT_FOUND");
  }

  const requesterMembership = await prisma.workspaceMember.findUnique({
    where: {
      userId_workspaceId: {
        userId: requesterUserId,
        workspaceId: workspace.id,
      },
    },
  });

  if (!requesterMembership) {
    throw new AppError(403, ErrorCode.FORBIDDEN);
  }

  // Rule 2: Members cannot remove anyone (Only Owner can)
  if (requesterMembership.role !== Role.OWNER) {
    throw new AppError(403, "ONLY_OWNER_CAN_REMOVE");
  }

  const targetMember = await prisma.workspaceMember.findUnique({
    where: { id: memberId },
  });

  if (!targetMember || targetMember.workspaceId !== workspace.id) {
    throw new AppError(404, "MEMBER_NOT_FOUND");
  }

  // Rule 3: Owner cannot remove themselves
  if (targetMember.userId === requesterUserId) {
    throw new AppError(400, "CANNOT_REMOVE_SELF");
  }

  await prisma.workspaceMember.delete({
    where: { id: memberId },
  });

  return { success: true };
}
