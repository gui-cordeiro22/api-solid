// Dependencies
import fastify from "fastify";

// Routes
import { appRoutes } from "./http/routes";

// Types
import { ZodError } from "zod";

// Utils
import { env } from "./env";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _request, response) => {
    if (error instanceof ZodError) {
        return response
            .status(400)
            .send({ message: "Validation error", issues: error.format() });
    }

    if (env.NODE_ENV !== "production") {
        console.error(error);
    } else {
        //TODO: Should log to an external tool
    }

    return response.status(500).send({ message: "Internal server error" });
});
