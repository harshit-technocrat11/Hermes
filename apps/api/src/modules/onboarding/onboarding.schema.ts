import { z } from "zod";

export const checkUsernameSchema = z.object({
  query: z.object({
    username: z
      .string()
      .trim()
      .min(1, "Username cannot be empty")
      .toLowerCase(),
  }),
});

export const submitOnboardingSchema = z.object({
  body: z
    .object({
      username: z
        .string()
        .trim()
        .min(1, "Username cannot be empty")
        .toLowerCase(),
      imageUrl: z.string().url("Invalid image URL").optional().or(z.literal("")),
      workspaceName: z
        .string()
        .trim()
        .min(1, "Workspace name cannot be empty")
        .optional(),
      inviteCode: z
        .string()
        .trim()
        .length(8, "Invite code must be exactly 8 characters")
        .toUpperCase()
        .optional(),
    })
    .refine((data) => data.workspaceName || data.inviteCode, {
      message: "Either workspaceName or inviteCode must be provided",
      path: ["workspaceName"],
    }),
});
