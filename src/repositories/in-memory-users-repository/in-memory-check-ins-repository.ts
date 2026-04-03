// Dependencies
import { randomUUID } from "node:crypto";

// Types
import { Prisma, CheckIn } from "@prisma/client";
import { CheckInsRepositoryProps } from "../check-ins-repository/check-ins-repository.types";

export class InMemoryCheckInsRepository implements CheckInsRepositoryProps {
    public items: CheckIn[] = [];

    async create(data: Prisma.CheckInUncheckedCreateInput) {
        const checkIn = {
            id: randomUUID(),
            user_id: data.user_id,
            gym_id: data.gym_id,
            created_at: new Date(),
            validated_at: data.validated_at
                ? new Date(data.validated_at)
                : null,
        };

        this.items.push(checkIn);

        return checkIn;
    }

    async findByUserIdOnData(userId: string, date: Date) {
        const checkInOnSameDate = this.items.find(
            (checkIn) => checkIn.user_id === userId,
        );

        if (!checkInOnSameDate) {
            return null;
        }

        return checkInOnSameDate;
    }
}
