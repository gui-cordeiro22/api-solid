// Dependencies
import { FastifyReply, FastifyRequest } from "fastify";

// Schema
import { registerBodySchema } from "./register.schema";

// Services
import { RegisterService } from "@/services/register";

// Repository
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

// Utils
import { UserAlreadyExistsError } from "@/errors/user-already-exists";

export const register = async (
    request: FastifyRequest,
    response: FastifyReply,
) => {
    const { name, email, password } = registerBodySchema.parse(request.body);

    const usersRepository = new PrismaUsersRepository();

    const registerUserService = new RegisterService(usersRepository);

    try {
        await registerUserService.execute({
            name,
            email,
            password,
        });
    } catch (error) {
        if (error instanceof UserAlreadyExistsError) {
            return response.status(409).send({ message: error.message });
        }

        return response.status(500).send(); //TODO: Do a better logic for errors
    }

    return response.status(201).send();
};
