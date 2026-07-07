import prisma from "../../lib/prisma";
import { createWorkspaceForUser } from "../workspace/workspace.service";

export const isUsernameAvailable = async (username: string): Promise<boolean> => {
  const sanitizedUsername = username.trim().toLowerCase();
  const existing = await prisma.user.findUnique({
    where: {
      username: sanitizedUsername,
    },
  });
  return !existing;
};

export const completeOnboarding = async (
  userId: string,
  username: string,
  imageUrl: string | undefined,
  workspaceName?: string,
  inviteCode?: string
) => {
  const sanitizedUsername = username.trim().toLowerCase();

  // Check if username is already taken by another user
  const existingUser = await prisma.user.findUnique({
    where: {
      username: sanitizedUsername,
    },
  });

  if (existingUser && existingUser.id !== userId) {
    throw new Error("Username already taken");
  }

  // Execute user update and workspace creation inside a database transaction
  return prisma.$transaction(async (tx) => {
    const user = await tx.user.update({
      where: {
        id: userId,
      },
      data: {
        username: sanitizedUsername,
        imageUrl: imageUrl || undefined,
        onboarded: true,
      },
    });

    let workspace;

    if (inviteCode) {
      const sanitizedCode = inviteCode.trim().toUpperCase();
      workspace = await tx.workspace.findUnique({
        where: { inviteCode: sanitizedCode },
      });

      if (!workspace) {
        throw new Error("Invalid invite code. Workspace not found.");
      }

      // Check if already a member
      const existingMembership = await tx.workspaceMember.findUnique({
        where: {
          userId_workspaceId: {
            userId,
            workspaceId: workspace.id,
          },
        },
      });

      if (!existingMembership) {
        await tx.workspaceMember.create({
          data: {
            workspaceId: workspace.id,
            userId,
            role: "MEMBER",
          },
        });
      }
    } else if (workspaceName) {
      workspace = await createWorkspaceForUser(userId, workspaceName, tx);
    } else {
      throw new Error("Either workspaceName or inviteCode is required.");
    }

    return { user, workspace };
  });
};
