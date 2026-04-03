// Dependencies
import { FastifyReply, FastifyRequest } from "fastify";

// Schema
import { authenticateBodySchema } from "./authenticate.schema";

// Utils
import { InvalidCredentialsError } from "@/errors/invalid-credentials";

// Factory
import { makeAuthenticateService } from "@/services/factories/make-authenticate.services";

export const authenticate = async (
    request: FastifyRequest,
    response: FastifyReply,
) => {
    const { email, password } = authenticateBodySchema.parse(request.body);

    const authenticateUserService = makeAuthenticateService();

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
