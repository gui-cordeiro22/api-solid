// Types
import { CheckIn } from "@prisma/client";

export type FetchCheckInsHistoryRequest = {
    userId: string;
    page: number;
};

export type FetchCheckInsHistoryResponse = {
    checkIns: CheckIn[];
};
