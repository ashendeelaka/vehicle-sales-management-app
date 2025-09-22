import { ApiClient } from "./api-client";


export interface LoginResponse {
    username: string;
    token: string;
}

export class AuthService extends ApiClient {
    constructor() {
        super(import.meta.env.VITE_API_URL || "http://localhost:5000/api");
    }

    async login(username: string, password: string): Promise<LoginResponse> {
        const res = await this.api.post("/auth/login", { username, password });
        localStorage.setItem("token", res.data.token);
        return res.data;
    }

    logout() {
        localStorage.removeItem("token");
    }
}
