// Types
import { Gym, Prisma } from "@prisma/client";

export type GymsRepositoryActions = {
    create(data: Prisma.GymCreateInput): Promise<Gym | null>;
    findById(id: string): Promise<Gym | null>;
};

export type GymsRepositoryProps = GymsRepositoryActions;
