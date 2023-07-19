export interface LoginResponse {
    token: string;
    email: string;
    role: "STUDENT" | "PROFESSOR" | "ADMIN";
}