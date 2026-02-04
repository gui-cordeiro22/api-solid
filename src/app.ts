// Dependencies
import fastify from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

prisma.user.create({
    data: {
        name: "Guilherme Cordeiro",
        email: "guilhermecordeiro43@gmail.com",
    },
});

export const app = fastify();
