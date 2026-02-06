// Dependencies
import { FastifyReply, FastifyRequest } from "fastify";

// Schema
import { registerBodySchema } from "./register.schema";

// Database
import { registerService } from "@/services/register/register";

export const register = async (
    request: FastifyRequest,
    response: FastifyReply,
) => {
    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
        await registerService({
            name,
            email,
            password,
        });
    } catch (error) {
        return response.status(409).send();
    }

    return response.status(201).send();
};
