// Dependencies
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";

const connectionString = process.env.DATABASE_URL!;
const pool = new Pool({ connectionString });
export const adapter = new PrismaPg(pool);

export const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClient | undefined;
};
