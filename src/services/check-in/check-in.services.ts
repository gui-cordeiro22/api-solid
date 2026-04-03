// Types
import { CheckInsRepositoryProps } from "@/repositories/check-ins-repository/check-ins-repository.types";
import { CheckInRequest, CheckInResponse } from "./check-in.types";

export class CheckInService {
    constructor(private checkinsRepository: CheckInsRepositoryProps) {}

    async execute({ userId, gymId }: CheckInRequest): Promise<CheckInResponse> {
        const checkInOnSameDay =
            await this.checkinsRepository.findByUserIdOnData(
                userId,
                new Date(),
            );

        if (!!checkInOnSameDay) {
            throw new Error();
        }

        const checkIn = await this.checkinsRepository.create({
            user_id: userId,
            gym_id: gymId,
        });

        return { checkIn };
    }
}
