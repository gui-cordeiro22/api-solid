// Types
import { CheckIn, Prisma } from "@prisma/client";

export type CheckInsRepositoryActions = {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
    findByUserIdOnData(userId: string, date: Date): Promise<CheckIn | null>;
};

export type CheckInsRepositoryProps = CheckInsRepositoryActions;
