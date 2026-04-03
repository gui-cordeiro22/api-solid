// Types
import { Gym } from "@prisma/client";

export type GymsRepositoryActions = {
    findById(id: string): Promise<Gym | null>;
};

export type GymsRepositoryProps = GymsRepositoryActions;
