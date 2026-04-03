// Types
import { CheckIn } from "@prisma/client";

export type CheckInRequest = {
    userId: string;
    gymId: string;
    userLatitude: number;
    userLongitude: number;
};

export type CheckInResponse = {
    checkIn: CheckIn;
};
