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
  workspaceName: string
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

    const workspace = await createWorkspaceForUser(userId, workspaceName, tx);

    return { user, workspace };
  });
};
