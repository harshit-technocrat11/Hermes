import { z } from "zod";

// create workspace
export const createWorkspaceSchema = z.object({
  body: z.object({
    name: z
      .string()
      .trim()
      .min(3, "Name must be atleast 3 characters")
      .max(50, "Name must not be more than 50 characters"),
  }),
});

// ── Join Workspace───────────
export const joinWorkspaceSchema = z.object({
  body: z.object({
    inviteCode: z
      .string()
      .trim()
      .length(8, "Invite code must be exactly 8 characters")
      .toUpperCase(),
  }),
});

// update workspace
export const updateWorkspaceSchema = z.object({
  params: z.object({
    slug: z.string().min(1, "Slug is required"),
  }),

  body: z
    .object({
      name: z
        .string()
        .trim()
        .min(3, "Name must be at least 3 characters")
        .max(50, "Name must be at most 50 characters")
        .optional(),

      iconUrl: z.url("Must be a valid URL").optional(),
    })
    .refine((data) => data.name !== undefined || data.iconUrl !== undefined, {
      message: "At least one field (name or iconUrl) must be provided",
    }),
});

// slug- params
export const slugParamSchema = z.object({
  params: z.object({
    slug: z.string().min(1, "Slug is required"),
  }),
});
