import { Request, Response } from "express";
import { successResponse } from "../../common/responses/api-response";
import * as onboardingService from "./onboarding.service";

export const checkUsername = async (req: Request, res: Response) => {
  // Safe to typecast as validation schema guarantees string type
  const username = req.query.username as string;

  const available = await onboardingService.isUsernameAvailable(username);

  return res.status(200).json(successResponse({ available }));
};

export const submitOnboarding = async (req: Request, res: Response) => {
  const { username, imageUrl, workspaceName, inviteCode } = req.body;
  const userId = req.user!.id; // req.user is guaranteed by global auth middleware

  try {
    const result = await onboardingService.completeOnboarding(
      userId,
      username,
      imageUrl,
      workspaceName,
      inviteCode
    );

    return res.status(200).json(
      successResponse({
        user: {
          id: result.user.id,
          username: result.user.username,
          email: result.user.email,
          imageUrl: result.user.imageUrl,
        },
        workspace: result.workspace,
        redirectUrl: `/workspace/${result.workspace.slug}`,
      })
    );
  } catch (error: any) {
    return res.status(400).json({
      message: error.message || "Something went wrong during onboarding.",
    });
  }
};
