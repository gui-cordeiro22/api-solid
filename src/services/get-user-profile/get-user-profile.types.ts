// Types
import { User } from "@prisma/client";

export type GetUserProfileServiceRequest = {
    userId: string;
};

export type GetUserProfileServiceResponse = {
    user: User;
};
