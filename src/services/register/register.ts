// Dependencies
import { hash } from "bcryptjs";

// Database
import { prisma } from "@/lib/prisma";

// Types
import { RegisterServiceProps } from "./register.types";

export const registerService = async ({
    name,
    email,
    password,
}: RegisterServiceProps) => {
    const password_hash = await hash(password, 6);

    const userWithSameEmail = prisma.user.findUnique({
        where: {
            email,
        },
    });

    if (!!userWithSameEmail) {
        throw new Error("E-mail already exists");
    }

    await prisma?.user?.create({
        data: {
            name,
            email,
            password_hash,
        },
    });
};
