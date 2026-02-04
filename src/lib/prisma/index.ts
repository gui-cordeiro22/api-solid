// Database
import { prisma } from "./prisma";

// Config
import { adapter, globalForPrisma } from "./prisma.config";

export { prisma, adapter, globalForPrisma };
