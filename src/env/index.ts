// Dependencies
import "dotenv/config";

// Schema
import { envSchema } from "./env.shemas";

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
    console.error("Invalid environment variables...", _env.error.format());

    throw new Error("Invalid environment variables...");
}

export const env = _env.data;
