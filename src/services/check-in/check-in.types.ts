// Types
import { CheckIn } from "@prisma/client";

export type CheckInRequest = {
    userId: string;
    gymId: string;
};

export type CheckInResponse = {
    checkIn: CheckIn;
};
