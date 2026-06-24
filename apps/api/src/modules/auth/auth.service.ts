import { AuthUser  } from "./auth.types";

export class AuthService {
    async getCurrentUser(): Promise<AuthUser> {
        return {
            id: "user_test",
            email: "test@example.com",
            name: "Harshit"
        }
    }
}

export const authService  = new AuthService();
