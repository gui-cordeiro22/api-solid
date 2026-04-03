// Types
import { Gym } from "@prisma/client";

export type CreateGymServiceRequest = {
    title: string;
    description: string | null;
    phone: string | null;
    latitude: number;
    longitude: number;
};

export type CreateGymServiceResponse = {
    gym: Gym;
};
