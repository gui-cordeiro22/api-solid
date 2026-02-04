// Dependencies
import "dotenv/config";
import { PrismaClient } from "@prisma/client";

// Configs
import { adapter, globalForPrisma } from "./prisma.config";

// Utils
import { env } from "@/env";

export const prisma =
    globalForPrisma.prisma ??
    new PrismaClient({
        adapter,
        log: env.NODE_ENV === "dev" ? ["query"] : [],
    });

if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = prisma;
}
