// Dependencies
import fastify from "fastify";

// Routes
import { appRoutes } from "./http/routes";

export const app = fastify();

app.register(appRoutes);
