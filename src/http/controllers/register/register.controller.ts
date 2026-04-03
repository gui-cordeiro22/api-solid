// Dependencies
import { FastifyReply, FastifyRequest } from "fastify";

// Schema
import { registerBodySchema } from "./register.schema";

// Utils
import { UserAlreadyExistsError } from "@/errors/user-already-exists";

// Factory
import { makeRegisterService } from "@/services/factories/make-register.services";

export const register = async (
    request: FastifyRequest,
    response: FastifyReply,
) => {
    const { name, email, password } = registerBodySchema.parse(request.body);

    const registerUserService = makeRegisterService();

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

        throw error;
    }

    return response.status(201).send();
};
