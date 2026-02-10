// Types
import { User } from "@prisma/client";

export type RegisterServiceRequest = {
    name: string;
    email: string;
    password: string;
};

export type RegisterServiceProps = RegisterServiceRequest;

export type RegisterServiceResponse = { user: User };
