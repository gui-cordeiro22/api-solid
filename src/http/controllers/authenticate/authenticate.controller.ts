// Dependencies
import { FastifyReply, FastifyRequest } from "fastify";

// Schema
import { authenticateBodySchema } from "./authenticate.schema";

// Services
import { AuthenticateService } from "@/services/authenticate";

// Repository
import { PrismaUsersRepository } from "@/repositories/prisma-users-repository";

// Utils
import { InvalidCredentialsError } from "@/errors/invalid-credentials";

export const authenticate = async (
    request: FastifyRequest,
    response: FastifyReply,
) => {
    const { email, password } = authenticateBodySchema.parse(request.body);

    const usersRepository = new PrismaUsersRepository();

    const authenticateUserService = new AuthenticateService(usersRepository);

    try {
        await authenticateUserService.execute({
            email,
            password,
        });
    } catch (error) {
        if (error instanceof InvalidCredentialsError) {
            return response.status(400).send({ message: error.message });
        }

        throw error;
    }

    return response.status(200).send();
};
