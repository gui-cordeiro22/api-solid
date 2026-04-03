// Types
import { CheckIn, Prisma } from "@prisma/client";

export type CheckInsRepositoryActions = {
    create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>;
};

export type CheckInsRepositoryProps = CheckInsRepositoryActions;
