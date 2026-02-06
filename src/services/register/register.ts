// Dependencies
import { hash } from "bcryptjs";

// Database
import { prisma } from "@/lib/prisma";

// Types
import { RegisterServiceProps } from "./register.types";

// Repository
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

export const registerService = async ({
    name,
    email,
    password,
}: RegisterServiceProps) => {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = await prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!!userWithSameEmail) {
        throw new Error("E-mail already exists");
    }

    const prismaUsersRepository = new PrismaUsersRepository();

    await prismaUsersRepository.create({
        name,
        email,
        password_hash,
    });
};
