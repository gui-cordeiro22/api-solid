// Dependencies
import { hash } from "bcryptjs";

// Database
import { prisma } from "@/lib/prisma";

// Types
import { RegisterServiceProps } from "./register.types";

export class RegisterService {
    constructor(private usersRepository: any) {}

    async execute({ name, email, password }: RegisterServiceProps) {
        const password_hash = await hash(password, 6);

        const userWithSameEmail = await prisma.user.findUnique({
            where: {
                email,
            },
        });

        if (!!userWithSameEmail) {
            throw new Error("E-mail already exists");
        }

        await this.usersRepository.create({
            name,
            email,
            password_hash,
        });
    }
}
