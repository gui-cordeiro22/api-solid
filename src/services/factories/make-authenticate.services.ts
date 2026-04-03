// Repository
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

// Service
import { AuthenticateService } from "../authenticate";

export const makeAuthenticateService = () => {
    const usersRepository = new PrismaUsersRepository();

    const authenticateUserService = new AuthenticateService(usersRepository);

    return authenticateUserService;
};
