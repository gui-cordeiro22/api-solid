// Database
import { prisma } from "@/lib/prisma";

// Types
import { Prisma } from "@prisma/client";
import { UsersRepositoryProps } from "../users-repositories.types";

export class PrismaUsersRepository implements UsersRepositoryProps {
    async create(data: Prisma.UserCreateInput) {
        const user = await prisma?.user?.create({
            data,
        });

        return user;
    }

    async findByEmail(email: string) {
        const user = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        return user;
    }
}
