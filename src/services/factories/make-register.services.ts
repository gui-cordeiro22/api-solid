// Repository
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

// Service
import { RegisterService } from "../register";

export const makeRegisterService = () => {
    const usersRepository = new PrismaUsersRepository();

    const registerUserService = new RegisterService(usersRepository);

    return registerUserService;
};
