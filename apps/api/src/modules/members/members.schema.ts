import { z } from "zod";

export const workspaceSlugSchema = z.object({
  params: z.object({
    workspaceSlug: z.string().min(1, "Workspace slug is required"),
  }),
});

export const removeMemberSchema = z.object({
  params: z.object({
    workspaceSlug: z.string().min(1, "Workspace slug is required"),
    memberId: z.string().uuid("Invalid member ID format"),
  }),
});
