// Dependencies
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

// Utils
import { env } from "@/env";

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
export const adapter = new PrismaPg(pool);

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};

export const getPrismaClient = () => {
    let response;

    if (!!globalForPrisma.prisma) {
        response = globalForPrisma.prisma;
    } else {
        new PrismaClient({
            adapter,
            log: env.NODE_ENV === "dev" ? ["query"] : [],
        });
    }

    return response;
};
