import { Request, Response } from "express";
import { authService } from "./auth.service";

export class AuthController {
  async getCurrentUser(_req: Request, res: Response): Promise<void> {
    const user = await authService.getCurrentUser();

    res.status(200).json({
      success: true,
      data: user,
      error: null,
    });
  }
}

export const authController = new AuthController();
