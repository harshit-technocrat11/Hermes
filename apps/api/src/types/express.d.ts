declare namespace Express {
  export interface Request {
    user?: {
      clerkId: string;
    };
  }
}
