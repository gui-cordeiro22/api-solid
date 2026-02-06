// Types
import { Prisma, User } from "@prisma/client";

export type UsersRepositoryActions = {
    findByEmail(email: string): Promise<User | null>;
    create(data: Prisma.UserCreateInput): Promise<User>;
};

export type UsersRepositoryProps = UsersRepositoryActions;
