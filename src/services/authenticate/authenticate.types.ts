// Types
import { User } from "@prisma/client";

export type AuthenticateRequest = {
    email: string;
    password: string;
};

export type AuthenticateResponse = {
    user: User;
};
